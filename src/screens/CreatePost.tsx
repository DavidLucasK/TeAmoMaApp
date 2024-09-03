import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Animated, TextInput } from 'react-native';
import CreatePostStyles from '../styles/CreatePostStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { CreatePostNavigationProp } from '../navigation';
import Header from '../components/Header';
import * as ImagePicker from 'expo-image-picker';

const CreatePost: React.FC = () => {
    const navigation = useNavigation<CreatePostNavigationProp>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [postText, setPostText] = useState<string>(''); // Estado para armazenar o texto do post

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Você precisa permitir o acesso à galeria!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Você precisa permitir o acesso à câmera!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <View style={CreatePostStyles.container}>
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
                            <TouchableOpacity onPress={pickImage} style={CreatePostStyles.galleryBtn}>
                                <Text style={CreatePostStyles.textGallery}>Escolher Imagem da Galeria</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={takePhoto} style={CreatePostStyles.photoBtn}>
                                <Text style={CreatePostStyles.textPhoto}>Tirar Foto</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        <TextInput
                            style={CreatePostStyles.textInput}
                            multiline
                            numberOfLines={4}
                            maxLength={500} // Limita a 500 caracteres
                            placeholder="Escreva algo aqui..."
                            value={postText}
                            onChangeText={setPostText} // Atualiza o estado com o texto digitado
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Posts')} style={CreatePostStyles.createBtn}>
                        <Text style={CreatePostStyles.createText}>Criar Post</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

export default CreatePost;