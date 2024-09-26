import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { View, Text, Alert, Image, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import CreateItemStyles from '../styles/CreateItemStyles';
import Header from '../components/Header';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
=======
import { View, Text, Alert, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import CreateItemStyles from '../styles/CreateItemStyles';
import Header from '../components/Header';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator'; // Importando a biblioteca
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
import { CreateItemNavigationProp } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '../context/AppContext';
import CustomAlert from '../components/CustomAlert';

const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

const CreateItem = () => {
    const navigation = useNavigation<CreateItemNavigationProp>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [textIndex, setTextIndex] = useState(0);
<<<<<<< HEAD
=======

>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertTitle, setAlertTitle] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');

<<<<<<< HEAD
    // Valores do item
=======
    //Valores do item
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
    const [titleItem, setTitleItem] = useState<string>('');
    const [descItem, setDescItem] = useState<string>('');
    const [priceItem, setPriceItem] = useState<string>('');

    const { user } = useAppContext();
    const { partnerId } = useAppContext();

    const resizeImage = async (uri: string) => {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 450, height: 300 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return manipulatedImage.uri;
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permissão Negada', 'Você precisa permitir o acesso à galeria!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });
        if (!result.canceled) {
            const resizedUri = await resizeImage(result.assets[0].uri);
            setSelectedImage(resizedUri);
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
            quality: 0.5,
        });
        if (!result.canceled) {
            const resizedUri = await resizeImage(result.assets[0].uri);
            setSelectedImage(resizedUri);
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

    const handleCreateItem = async () => {
        // Validação inicial para garantir que os campos estão preenchidos
        if (!titleItem || !descItem || !priceItem || !selectedImage) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        // Envia o item apenas após o upload da imagem
        setUploading(true);
        try {
            // Upload da imagem
            const imageUrl = await uploadImage();

            // Se o upload falhou
            if (!imageUrl) {
                Alert.alert('Erro', 'Erro ao enviar a imagem.');
                setUploading(false);
                return;
            }

<<<<<<< HEAD
=======
            console.log('tentando criar item')

>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
            // Criação do item
            const response = await axios.post(`${backendUrl}/create_item/${partnerId}`, {
                title_item: titleItem,
                desc_item: descItem,
                points: priceItem,
                image_url: imageUrl,
            });

<<<<<<< HEAD
=======
            console.log(`${titleItem}, ${descItem}, ${priceItem}, ${imageUrl}`)

>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
            // Verifica se a resposta foi bem-sucedida
            if (response.status === 201) {
                setAlertTitle('Sucesso');
                setAlertMessage('Item criado com sucesso!');
                setShowAlert(true);
                navigation.navigate('Store'); // Redireciona para a tela da loja
            } else {
                Alert.alert('Erro', response.data.error || 'Falha ao criar o item.');
            }
        } catch (error) {
            console.error('Erro ao criar o item:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao criar o item.');
        } finally {
            setUploading(false);
        }
    };

    const uploadImage = async () => {
        if (!selectedImage) return;

        const fileName = selectedImage.split('/').pop() || 'foto_store';

        const formData = new FormData();
        formData.append('photo', {
            uri: selectedImage,
            type: 'image/jpeg',
            name: fileName,
        } as any);

        try {
            const response = await axios.post(`${backendUrl}/foto_store`, formData, {
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

    const texts = ['Enviando.  ', 'Enviando.. ', 'Enviando...'];

    return (
<<<<<<< HEAD
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={CreateItemStyles.container}>
=======
        <View style={CreateItemStyles.container}>
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
            <Header
                leftIcon={require('./assets/store.png')}
                onLeftIconPress={() => navigation.navigate('Store')}
                middleIcon={require('./assets/posts.png')}
                onMiddleIconPress={() => navigation.navigate('Posts')}
                rightIcon={require('./assets/profile-user.png')}
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={true}
            />
            <LinearGradient
                colors={['#e41d69', '#fe8277']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={CreateItemStyles.main}
            >
                <View style={CreateItemStyles.main}>
                    <View style={CreateItemStyles.postsContainer}>
                        <Text style={CreateItemStyles.titleCreate}>Criar Item</Text>
                        <TouchableOpacity activeOpacity={0.5} onPress={showImageOptions} style={CreateItemStyles.imageContainer}>
                            {selectedImage ? (
<<<<<<< HEAD
=======
                                // Se houver uma imagem selecionada, exiba apenas a imagem
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={CreateItemStyles.imageUploaded}
                                />
                            ) : (
<<<<<<< HEAD
=======
                                // Se não houver imagem selecionada, exiba o botão de upload
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
                                <View style={CreateItemStyles.photosContainer}>
                                    <View style={CreateItemStyles.camContainer}>
                                        <Image
                                            source={require('./assets/camera.png')}
                                            style={CreateItemStyles.iconCam}
                                        />
                                    </View>
                                    <Text style={CreateItemStyles.camText}>Resolução 400X350</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <TextInput
                            style={CreateItemStyles.textInput}
                            placeholder="Título do item"
                            value={titleItem}
                            onChangeText={setTitleItem}
                        />
                        <TextInput
                            style={CreateItemStyles.textInput}
                            placeholder="Descrição do item"
                            value={descItem}
                            onChangeText={setDescItem}
                        />
                        <TextInput
                            style={CreateItemStyles.textInput}
                            keyboardType="numeric"
                            placeholder="Quantidade de pontos"
                            value={priceItem}
                            onChangeText={(text) => {
<<<<<<< HEAD
                                const numericValue = text.replace(/[^0-9]/g, '');
=======
                                const numericValue = text.replace(/[^0-9]/g, ''); // Garante que só números inteiros sejam permitidos
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
                                setPriceItem(numericValue);
                            }}
                        />
                        <TouchableOpacity style={CreateItemStyles.createBtn} onPress={handleCreateItem} disabled={uploading}>
                            {uploading ? 
                                <View>
                                    {texts.map((text, index) => (
                                        <Text
                                            key={index}
                                            style={[CreateItemStyles.text, { display: textIndex === index ? 'flex' : 'none' }]}
                                        >
                                            {text}
                                        </Text>
                                    ))}
                                </View>
<<<<<<< HEAD
                            : <Text style={CreateItemStyles.createText}>Criar</Text>}
=======
                            : <Text style={CreateItemStyles.createText}>Criar Item</Text>}
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            <Modal
                visible={modalVisible}
<<<<<<< HEAD
                animationType="slide"
                transparent={true}
=======
                transparent={true}
                animationType="fade"
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
                onRequestClose={handleModalClose}
            >
                <View style={CreateItemStyles.modalContainer}>
                    <View style={CreateItemStyles.modalContent}>
<<<<<<< HEAD
                        <TouchableOpacity onPress={() => handleOptionSelect('camera')}>
                            <Text style={CreateItemStyles.modalText}>Câmera</Text>
=======
                        
                        <TouchableOpacity onPress={() => handleOptionSelect('camera')}>
                            <Text style={CreateItemStyles.modalText}>Tirar Foto</Text>
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleOptionSelect('gallery')}>
                            <Text style={CreateItemStyles.modalText}>Galeria</Text>
                        </TouchableOpacity>
<<<<<<< HEAD
                        <TouchableOpacity onPress={handleModalClose}>
=======
                        <TouchableOpacity  onPress={handleModalClose}>
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
                            <Text style={CreateItemStyles.cancelBtn}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <CustomAlert
                visible={showAlert}
                title={alertTitle}
                message={alertMessage}
                onClose={() => setShowAlert(false)}
            />
<<<<<<< HEAD
        </ScrollView>
=======
        </View>
>>>>>>> f9dabbf32e9803731341ab7d9ac7172e962653dc
    );
};

export default CreateItem;
