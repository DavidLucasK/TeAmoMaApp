import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AddPartnerStyles from '../styles/AddPartnerStyles';
import { useNavigation } from '@react-navigation/native';
import { AddPartnerNavigationProp } from '../navigation';
import Header from '../components/Header';

const AddPartner: React.FC = () => {
    const navigation = useNavigation<AddPartnerNavigationProp>();

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
        <TouchableOpacity style={AddPartnerStyles.updateButton}>
            <Text style={AddPartnerStyles.updateButtonText}>
                oi
            </Text>
        </TouchableOpacity>
        <Text>Parceiro: </Text>
    </View>
  );
};


export default AddPartner;