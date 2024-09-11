import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import ProfileStyles from '../styles/ProfileStyles'; // Importando estilos
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ProfileNavigationProp } from '../navigation';
import Header from '../components/Header';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  let userId = null;
  const [points, setPoints] = useState<number>(0);

  const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userId = '1'; // User da Ma = 1
        const response = await axios.get(`${backendUrl}/get-profile/${userId}`);
        const profileData = response.data;

        setProfileImage(profileData.profile_image || '');
        setName(profileData.name || '');
        setEmail(profileData.email || '');
        setPhone(profileData.phone || '');
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
      }
    };

    loadProfileData();
    fetchPoints();
  }, []);

  const showImageOptions = () => {
    setModalVisible(true);
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
        setSelectedImage(result.assets[0].uri);
        setProfileImage(result.assets[0].uri);
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
        setSelectedImage(result.assets[0].uri);
        setProfileImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    const fileName = selectedImage.split('/').pop() || 'profile_pic';

    const formData = new FormData();
    formData.append('photo', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: fileName,
    } as any);

    try {
        const response = await axios.post(`${backendUrl}/upload_imagepic`, formData, {
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

  const updateProfile = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
  
    setUploading(true);
    
    // Realiza o upload da imagem e recebe o caminho da imagem
    const imagePath = selectedImage ? await uploadImage() : profileImage; // Use o profileImage se nenhuma nova imagem for selecionada
  
    try {
      // Atualiza o perfil no backend
      await axios.post(`${backendUrl}/update-profile`, {
        userId: 1, // Atualizando o profile do userId 1 = Mazinha02
        name,
        email,
        phone,
        profileImage: imagePath || '' // Passa a URL da imagem
      });
  
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      
      // Atualiza o estado do profileImage com a URL da nova imagem
      setProfileImage(imagePath); // Atualiza para a nova imagem
      
      // Limpa a seleção da imagem
      setSelectedImage(null);
      
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil no momento.');
    }
  
    setUploading(false);
  };

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

  return (
    <KeyboardAvoidingView
      style={ProfileStyles.container}
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
          style={ProfileStyles.main}
        >
          <View style={ProfileStyles.main}>
            <View style={ProfileStyles.profileInfo}>
              <View style={ProfileStyles.photoContainer}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={ProfileStyles.profileImage}
                  />
                ) : (
                  <Image
                    style={ProfileStyles.profileImage}
                  />
                )}
                <TouchableOpacity onPress={showImageOptions}>
                  <Text style={ProfileStyles.changePhotoButton}>Mudar Foto</Text>
                </TouchableOpacity>
              </View>
              <View style={ProfileStyles.textContainer}>
                <Text style={ProfileStyles.points}>Pontos: {points}</Text>
                <Text style={ProfileStyles.info}>Nome de Usuário</Text>
                <TextInput
                  style={ProfileStyles.textInput}
                  placeholder="Nome"
                  value={name}
                  onChangeText={setName}
                />
                <Text style={ProfileStyles.info}>Email</Text>
                <TextInput
                  style={ProfileStyles.textInput}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <Text style={ProfileStyles.info}>Telefone</Text>
                <TextInput
                  style={ProfileStyles.textInput}
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
                <TouchableOpacity
                  onPress={updateProfile}
                  style={ProfileStyles.updateButton}
                  disabled={uploading}
                >
                  <Text style={ProfileStyles.updateButtonText}>
                    {uploading ? 'Atualizando...' : 'Atualizar Perfil'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleModalClose}
        >
          <View style={ProfileStyles.modalContainer}>
            <View style={ProfileStyles.modalContent}>
              <Text style={ProfileStyles.modalText} onPress={() => handleOptionSelect('camera')}>
                Tirar Foto
              </Text>
              <Text style={ProfileStyles.modalText} onPress={() => handleOptionSelect('gallery')}>
                Galeria
              </Text>
              <TouchableOpacity onPress={handleModalClose}>
                <Text style={ProfileStyles.cancelBtn}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
