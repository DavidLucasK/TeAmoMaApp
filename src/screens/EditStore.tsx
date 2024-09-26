import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import EditStoreStyles from '../styles/EditStoreStyles';
import CustomAlert from '../components/CustomAlert';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { EditStoreNavigationProp } from '../navigation';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

interface Item {
    id: string;
    title: string;
    description: string;
    points: number;
    imageUrl: string;
}

const EditStore: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<EditStoreNavigationProp>();

    const [items, setItems] = useState<Item[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertTitle, setAlertTitle] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false); // Estado para controlar o modal
    const [itemToDelete, setItemToDelete] = useState<string | null>(null); // ID do item a ser excluído

    const [modalSureVisible, setModalSureVisible] = useState<boolean>(false);

    const backendUrl = 'https://backendlogindl.vercel.app/api/auth';
    const { user, partnerId } = useAppContext();

    useEffect(() => {
        fetchItems(); // Chama a função para buscar itens
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        console.log('Iniciando a requisição para buscar itens...');
        try {
            const response = await axios.get(`${backendUrl}/items/${partnerId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const items = response.data;
            if (Array.isArray(items)) {
                console.log('Itens recebidos:', items);
                const formattedItems = items.map(item => ({
                    id: item.id,
                    title: item.name,
                    description: item.description,
                    points: item.points_required,
                    imageUrl: item.image_url,
                }));
                setItems(formattedItems);
            } else {
                console.error('A resposta não contém um array de itens.');
            }
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        } finally {
            setLoading(false);
        }
    };

    // Função para fechar o modal
    const closeSureModal = () => {
        setModalSureVisible(false);
    };

    const confirmDelete = (itemId: string) => {
        setModalSureVisible(true); // Exibe o modal de confirmação
        setItemToDelete(itemId); // Define o item a ser excluído
    };

    const deleteItem = async () => {
        if (!itemToDelete) return;
        try {
            await axios.delete(`${backendUrl}/delete_item/${itemToDelete}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setAlertTitle('Sucesso');
            setAlertMessage('Item excluído com sucesso!');
            fetchItems(); // Atualiza a lista de itens
        } catch (error) {
            setAlertTitle('Erro');
            setAlertMessage('Erro ao excluir o item.');
            console.error('Erro ao excluir o item:', error);
        } finally {
            setShowModal(false); // Fecha o modal
            setItemToDelete(null); // Limpa o ID do item a ser excluído
        }
    };

    return (
        <View style={EditStoreStyles.container}>
            <Header
                leftIcon={require('./assets/game.png')}
                middleIcon={require('./assets/posts.png')}
                rightIcon={require('./assets/profile-user.png')}
                onLeftIconPress={() => navigation.navigate('EarnPoints')}
                onMiddleIconPress={() => navigation.navigate('Posts')}
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={true}
            />
            <TouchableOpacity
                style={EditStoreStyles.plusBtn}
                onPress={() => navigation.navigate('CreateItem')}>
                <Text style={EditStoreStyles.plus}>Criar novo item</Text>
            </TouchableOpacity>
            <ScrollView
                style={EditStoreStyles.storeSection}
                showsVerticalScrollIndicator={false}
            >
                <View style={EditStoreStyles.bordaBottom}></View>
                {loading ? (
                    <View>
                        <Text style={EditStoreStyles.itemTitle}>Carregando...</Text>
                        <View style={EditStoreStyles.leftSide}>
                            <Image source={require('./assets/loading.gif')} style={EditStoreStyles.itemImage} />
                        </View>
                        <View style={EditStoreStyles.rightSide}>
                            <Text style={EditStoreStyles.itemDescription}>Carma aí que tá carregando, minha fia!</Text>
                            <Text style={EditStoreStyles.itemPoints}>Custa alguma coisa, carma aí uai...</Text>
                            <TouchableOpacity
                                style={EditStoreStyles.redeemButton}
                            >
                                <Text style={EditStoreStyles.redeemButtonText}>
                                    Carregando...
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    Array.isArray(items) && items.length > 0 ? (
                        items.map((item) => (
                            <View key={item.id}>
                                <TouchableOpacity 
                                    onPress={() => confirmDelete(item.id)}>
                                    <Image style={EditStoreStyles.iconTrash} source={require('./assets/trash.png')} />
                                </TouchableOpacity>
                                <Text style={EditStoreStyles.itemTitle}>{item.title}</Text>
                                <View style={EditStoreStyles.leftSide}>
                                    <Image source={{ uri: item.imageUrl }} style={EditStoreStyles.itemImage} />
                                    <LinearGradient
                                        colors={['transparent', '#0000002b', '#FFFFFFFF']}
                                        style={EditStoreStyles.borderImage}
                                    ></LinearGradient>
                                </View>
                                <View style={EditStoreStyles.rightSide}>
                                    <Text style={EditStoreStyles.itemDescription}>{item.description}</Text>
                                    <Text style={EditStoreStyles.itemPoints2}>
                                        Preço LovePoints: <Text style={{ color: '#e41d69' }}>{item.points}</Text>
                                    </Text>
                                </View>
                                <View style={EditStoreStyles.bordaBottom}></View>
                            </View>
                        ))
                    ) : (
                        <Text style={EditStoreStyles.noItems}>Nenhum item disponível.</Text>
                    )
                )}
            </ScrollView>
            {showAlert && (
                <CustomAlert
                    title={alertTitle}
                    message={alertMessage}
                    visible={true}
                    onClose={() => setShowAlert(false)}
                />
            )}
            {modalSureVisible && (
                <Modal transparent={true} visible={modalSureVisible} animationType="fade">
                    <View style={EditStoreStyles.modalContainer}>
                        <View style={EditStoreStyles.modalContent}>
                            <Text style={EditStoreStyles.modalTitle}>Você tem certeza que deseja excluir o item?</Text>
                            <View style={EditStoreStyles.modalButtons}>
                                <TouchableOpacity style={EditStoreStyles.buttonCancel} onPress={closeSureModal}>
                                    <Text style={EditStoreStyles.buttonText1}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={EditStoreStyles.buttonConfirm} onPress={() => {
                                    deleteItem(); // Chama a função deleteItem ao clicar em "Sim"
                                    closeSureModal(); // Fecha o modal
                                }}>
                                    <Text style={EditStoreStyles.buttonText1}>Sim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default EditStore;
