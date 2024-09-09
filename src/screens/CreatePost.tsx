import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, Button, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import CreatePostStyles from '../styles/CreatePostStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { CreatePostNavigationProp } from '../navigation';
import Header from '../components/Header';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CreatePost: React.FC = () => {
    const navigation = useNavigation<CreatePostNavigationProp>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [postText, setPostText] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permissão Negada', 'Você precisa permitir o acesso à galeria!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [12, 16],
            quality: 0.5,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permissão Negada', 'Você precisa permitir o acesso à câmera!');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [12, 16],
            quality: 0.5,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    // Função para mostrar o modal
    const showImageOptions = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleOptionSelect = (option: 'camera' | 'gallery') => {
        handleModalClose();
        if (option === 'camera') {
            takePhoto();
        } else {
            pickImage();
        }
    };

    const uploadImage = async () => {
        if (!selectedImage) return;

        const fileName = selectedImage.split('/').pop() || 'foto_post';

        const formData = new FormData();
        formData.append('photo', {
            uri: selectedImage,
            type: 'image/jpeg',
            name: fileName,
        } as any);

        try {
            const response = await axios.post(`${backendUrl}/foto_post`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { fileUrl } = response.data;
            return fileUrl;
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
            return '';
        }
    };

    const usernamezada = "Mazinha02";

    const createPost = async () => {
        if (!selectedImage || !postText) {
            Alert.alert('Erro', 'Por favor, insira uma imagem e um texto.');
            return;
        }

        setUploading(true);
        const imagePath = await uploadImage();

        if (imagePath) {
            try {
                console.log("tentando postar")
                await axios.post(`${backendUrl}/upload_post`, {
                    nome_foto: imagePath,
                    desc_foto: postText,
                    username: usernamezada
                });
                Alert.alert('Sucesso', 'Post criado com sucesso!');
                setSelectedImage(null);
                setPostText('');
                navigation.navigate('Posts');
            } catch (error) {
                console.error('Erro ao criar post:', error);
                Alert.alert('Erro', 'Não foi possível criar o post no momento. Tente mais tarde');
            }
        }
        setUploading(false);
    };

    return (
        <KeyboardAvoidingView
            style={CreatePostStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <Header
                    leftIcon={require('./assets/store.png')}
                    middleIcon={require('./assets/posts.png')}
                    rightIcon={require('./assets/profile-user.png')}
                    onLeftIconPress={() => navigation.navigate('Store')}
                    onMiddleIconPress={() => navigation.navigate('Posts')}
                    onRightIconPress={() => navigation.navigate('Profile')}
                    isStoreScreen={false}
                />
                <LinearGradient
                    colors={['#e41d69', '#fe8277']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={CreatePostStyles.main}
                >
                    <View style={CreatePostStyles.main}>
                        <View style={CreatePostStyles.postsContainer}>
                            <View style={CreatePostStyles.imageContainer}>
                                {selectedImage && (
                                    <Image
                                        source={{ uri: selectedImage }}
                                        style={CreatePostStyles.imageUploaded}
                                    />
                                )}
                                <View style={CreatePostStyles.photosContainer}>
                                    <TouchableOpacity onPress={showImageOptions} style={CreatePostStyles.camContainer}>
                                        <Image
                                            source={require('./assets/camera.png')}
                                            style={CreatePostStyles.iconCam}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TextInput
                                style={CreatePostStyles.textInput}
                                multiline
                                numberOfLines={4}
                                maxLength={500}
                                placeholder="Escreva algo aqui..."
                                value={postText}
                                onChangeText={setPostText}
                            />
                            <TouchableOpacity onPress={createPost} style={CreatePostStyles.createBtn} disabled={uploading}>
                            <Text style={CreatePostStyles.createText}>
                                {uploading ? 'Enviando...' : 'Criar Post'}
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={handleModalClose}
                >
                    <View style={CreatePostStyles.modalContainer}>
                        <View style={CreatePostStyles.modalContent}>
                            <Text style={CreatePostStyles.modalText} onPress={() => handleOptionSelect('camera')}>
                                Tirar Foto
                            </Text>
                            <Text style={CreatePostStyles.modalText} onPress={() => handleOptionSelect('gallery')}>
                                Galeria
                            </Text>
                            <TouchableOpacity onPress={handleModalClose}>
                                <Text style={CreatePostStyles.cancelBtn}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreatePost;