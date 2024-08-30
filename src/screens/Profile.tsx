import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import ProfileStyles from '../styles/ProfileStyles'; // Importando os estilos
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { ProfileNavigationProp } from '../navigation';

const Profile: React.FC = () => {
    const [profileImage, setProfileImage] = useState('assets/profile_ma.png'); // Imagem padrão
    const [points, setPoints] = useState<number>(0);
    const navigation = useNavigation<ProfileNavigationProp>();


    useEffect(() => {
        fetchPoints();

        const loadProfileImage = async () => {
            const savedImage = await AsyncStorage.getItem('profileImage');
            if (savedImage) {
                setProfileImage(savedImage); // Carrega a imagem salva
            }
        };

        loadProfileImage();
    }, []);

    const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

  const fetchPoints = async () => {
    console.log('Iniciando a requisição para buscar pontos...');
    try {
      const response = await axios.get(`${backendUrl}/points`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Erro ao buscar pontos: ' + response.statusText);
      }

      console.log('Pontos recebidos:', response.data.points);
      setPoints(response.data.points);
    } catch (error: any) {
      console.error('Erro ao buscar pontos:', error);
    }
  };

    const handleChangePhoto = async () => {
        // Solicitar permissão para acessar a galeria e a câmera
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted' || cameraStatus.status !== 'granted') {
            Alert.alert('Permissão negada', 'Permissão negada para acessar a galeria ou a câmera.');
            return;
        }

        // Opções para o usuário escolher entre câmera ou galeria
        const action = await Alert.alert(
            'Escolha uma opção',
            'Você gostaria de usar a Câmera ou Galeria?',
            [
                { text: 'Câmera', onPress: () => openCamera() },
                { text: 'Galeria', onPress: () => openGallery() },
                { text: 'Cancelar', style: 'cancel' },
            ]
        );
    };

    const openCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newImageUri = result.assets[0].uri; // URI da nova imagem
            setProfileImage(newImageUri); // Atualiza o estado com a nova imagem
            await AsyncStorage.setItem('profileImage', newImageUri); // Salva a nova imagem no AsyncStorage
        }
    };

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newImageUri = result.assets[0].uri; // URI da nova imagem
            setProfileImage(newImageUri); // Atualiza o estado com a nova imagem
            await AsyncStorage.setItem('profileImage', newImageUri); // Salva a nova imagem no AsyncStorage
        }
    };

    return (
        <View style={ProfileStyles.container}>
            <Header
                leftIcon={require('./assets/store.png')}
                rightIcon={require('./assets/profile-user.png')}
                onLeftIconPress={() => navigation.navigate('Store')} // Passando a função
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            <LinearGradient
                    colors={['#e41d69', '#fe8277']}
                    start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
                    end={{ x: 1, y: 0 }}
                    style={ProfileStyles.container} // Usando o estilo do cabeçalho
            >
            <View style={ProfileStyles.content}>
                <View style={ProfileStyles.profileInfo}>
                    <View style={ProfileStyles.photoContainer}>
                        <View style={ProfileStyles.photoBefore}></View>
                        <Image source={{ uri: profileImage }} style={ProfileStyles.profileImage} />
                        <TouchableOpacity onPress={handleChangePhoto}>
                            <Text style={ProfileStyles.changePhotoButton}>Mudar Foto</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ProfileStyles.textContainer}>
                        <Text style={ProfileStyles.info}>Nome:</Text>
                        <Text style={ProfileStyles.variable}>Marcela Zaglia Montagner</Text>
                        <Text style={ProfileStyles.info}>Email:</Text>
                        <Text style={ProfileStyles.variable}>marcela-montagner@gmail.com</Text>
                        <Text style={ProfileStyles.info}>Telefone:</Text>
                        <Text style={ProfileStyles.variable}>+55 (19) 99990-0180</Text>
                        <View style={ProfileStyles.pointsContainer}>
                            <Text style={ProfileStyles.info}>Você tem:</Text>
                            <Text style={ProfileStyles.points}>{points} LovePoints</Text>
                        </View>
                    </View>
                </View>
            </View>
            </LinearGradient>
        </View>
        
    );
};

export default Profile;