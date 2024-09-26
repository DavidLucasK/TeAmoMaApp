import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import EditItemStyles from '../styles/EditItemStyles';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, EditItemNavigationProp } from '../navigation';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import axios from 'axios';
import { Alert } from 'react-native';
import EditStore from './EditStore';
import CustomAlert from '../components/CustomAlert';

type EditItemRouteProp = RouteProp<RootStackParamList, 'EditItem'>;

const EditItem: React.FC = () => {
    const navigation = useNavigation<EditItemNavigationProp>();
    const route = useRoute<EditItemRouteProp>(); // Para acessar os parâmetros da rota
    const { itemId, itemTitle, itemImageUrl, itemDesc, itemPoints } = route.params;

    const [updating, setUpdating] = useState<boolean>(false);

    const [itemNameValue, setItemNameValue] = useState<string>('');
    const [itemDescValue, setItemDescValue] = useState<string>('');
    const [itemPointsValue, setItemPointsValue] = useState<string>('');
    const [itemImageUrlValue, setItemImageUrlValue] = useState<string>('');

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertTitle, setAlertTitle] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');

    const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

    // UseEffect para definir o valor de itemPoints no estado apenas uma vez
    useEffect(() => {
        if (itemTitle !== undefined) {
            setItemNameValue(itemTitle);
        }
    }, [itemTitle]);

    useEffect(() => {
        if (itemDesc !== undefined) {
            setItemDescValue(itemDesc);
        }
    }, [itemDesc]);

    useEffect(() => {
        if (itemPoints !== undefined) {
            setItemPointsValue(itemPoints.toString());
        }
    }, [itemPoints]);

    const updateItem = async () => {  
        setUpdating(true);
      
        try {
            console.log('tentando atualizar o item:', { itemId });
    
            // Atualiza o perfil no backend, corrigindo o payload
            await axios.post(`${backendUrl}/update_item/${itemId}`, {
                itemName: itemNameValue,
                itemDesc: itemDescValue,
                itemPoints: itemPointsValue, // Enviando o valor correto
            });
    
            setAlertTitle('Sucesso');
            setAlertMessage('Item criado com sucesso!');
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 850)
          
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o item no momento.');
        }
      
        setUpdating(false);
    };

    return (
        <View style={EditItemStyles.container}>
            <Header
                leftIcon={require('./assets/game.png')}
                middleIcon={require('./assets/posts.png')}
                rightIcon={require('./assets/profile-user.png')}
                onLeftIconPress={() => navigation.navigate('EarnPoints')}
                onMiddleIconPress={() => navigation.navigate('Posts')}
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={true}
            />
            <TouchableOpacity style={EditItemStyles.backContainer} onPress={() => navigation.navigate('EditStore')}>
                <Text style={EditItemStyles.backText}>Voltar</Text>
            </TouchableOpacity>
            <ScrollView
                style={EditItemStyles.itemSection}
                showsVerticalScrollIndicator={false}
            >
                <View key={itemId}>
                    <TextInput value={itemNameValue} multiline={true} onChangeText={setItemNameValue} style={EditItemStyles.itemTitle}/>
                    <View style={EditItemStyles.leftSide}>
                        <Image source={{ uri: itemImageUrl }} style={EditItemStyles.itemImage} />
                        <LinearGradient
                            colors={['transparent', '#0000002b', '#FFFFFFFF']}
                            style={EditItemStyles.borderImage}
                        />
                    </View>
                    <View style={EditItemStyles.rightSide}>
                        <TextInput value={itemDescValue} multiline={true} onChangeText={setItemDescValue} style={EditItemStyles.itemDescription}/>
                        <Text style={EditItemStyles.itemPoints2}>
                            Preço LovePoints
                        </Text>
                        <TextInput 
                                value={itemPointsValue}
                                keyboardType='numeric'
                                onChangeText={setItemPointsValue} // Permitir alteração do valor
                                style={EditItemStyles.itemPoints} 
                            />
                    </View>
                    <TouchableOpacity style={EditItemStyles.containerBtn} onPress={updateItem}>
                        <Text style={EditItemStyles.saveBtn}>Salvar alterações</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <CustomAlert
                visible={showAlert}
                title={alertTitle}
                message={alertMessage}
                onClose={() => setShowAlert(false)}
            />
        </View>
    );
};

export default EditItem;
