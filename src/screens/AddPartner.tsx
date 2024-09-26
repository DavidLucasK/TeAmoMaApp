import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import AddPartnerStyles from '../styles/AddPartnerStyles';
import { useNavigation } from '@react-navigation/native';
import { AddPartnerNavigationProp } from '../navigation';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

const AddPartner: React.FC = () => {
    const navigation = useNavigation<AddPartnerNavigationProp>();
    const backendUrl = 'https://backendlogindl.vercel.app/api/auth';
    const { partnerId } = useAppContext();

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [namePartner, setNamePartner] = useState<string>('');
    const [emailPartner, setEmailPartner] = useState<string>('');
    const [phonePartner, setPhonePartner] = useState<string>('');
    const [pointsPartner, setPointsPartner] = useState<number>(0);

    useEffect(() => {
    const loadPartnerData = async () => {
      try {
          const response = await axios.get(`${backendUrl}/get-profile/${partnerId}`);
          const partnerData = response.data;
          setProfileImage(partnerData.profile_image || '');
          setNamePartner(partnerData.name || '');
          setEmailPartner(partnerData.email || '');
          setPhonePartner(partnerData.phone || '');
      } catch (error) {
        console.error('Erro ao carregar perfil do parceiro:', error);
      }
    };

  loadPartnerData();
  fetchPoints();
}, [partnerId]);

const fetchPoints = async () => {
  console.log('Iniciando a requisição para buscar pontos...');
  try {
    const response = await axios.get(`${backendUrl}/points/${partnerId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar pontos: ' + response.statusText);
    }

    console.log('Pontos recebidos:', response.data.points);
    setPointsPartner(response.data.points);
  } catch (error: any) {
    console.error('Erro ao buscar pontos:', error);
  }
};

return (
  <View style={AddPartnerStyles.container}>
    <Header
      leftIcon={require('./assets/store.png')}
      onLeftIconPress={() => navigation.navigate('Store')}
      middleIcon={require('./assets/posts.png')}
      onMiddleIconPress={() => navigation.navigate('Posts')}
      rightIcon={require('./assets/profile-user.png')}
      onRightIconPress={() => navigation.navigate('Profile')}
      isStoreScreen={false}
    />
    {partnerId ? (
      <>
        <LinearGradient
          colors={['#e41d69', '#fe8277']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={AddPartnerStyles.main}
        >
          <Text style={AddPartnerStyles.title}>Perfil do Parceiro</Text>
          <View style={AddPartnerStyles.main}>
            <View style={AddPartnerStyles.profileInfo}>
              <View style={AddPartnerStyles.photoContainer}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={AddPartnerStyles.profileImage}
                  />
                ) : (
                  <Image
                    style={AddPartnerStyles.profileImage}
                  />
                )}
              </View>
              <View style={AddPartnerStyles.textContainer}>
                <Text style={AddPartnerStyles.points}>Pontos: {pointsPartner}</Text>
                <Text style={AddPartnerStyles.info}>Nome de Usuário</Text>
                <Text
                  style={AddPartnerStyles.textInput}
                >{namePartner}</Text>
                <Text style={AddPartnerStyles.info}>Email</Text>
                <Text style={AddPartnerStyles.textInput}>{emailPartner}</Text>
                <Text style={AddPartnerStyles.info}>Telefone</Text>
                <Text style={AddPartnerStyles.textInput}>{phonePartner}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </>
    ) : (
      <Text>NÃO HÁ DADOS</Text>
    )}
  </View>
);
};


export default AddPartner;