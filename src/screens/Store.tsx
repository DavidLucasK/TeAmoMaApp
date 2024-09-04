import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient

import StoreStyles from '../styles/StoreStyles';
import Header from '../components/Header';
import CustomAlert from '../components/CustomAlert';
import { StoreNavigationProp } from '../navigation'; // Importando o tipo de navegação

interface Item {
  id: string;
  title: string;
  description: string;
  points: number;
  imageUrl: string;
}

type ImageKeys = 'combo_lanche' | 'cinema' | 'massagem' | 'lovenight' | 'cupom' | 'presente' | 'assistir' | 'sobremesa';

const Store: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]); // Inicializa como um array vazio
  const [isRedeeming, setIsRedeeming] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false); // Estado para controle de atualização
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StoreNavigationProp>();

  useEffect(() => {
    fetchPoints();
    fetchItems(); // Chama a função para buscar itens
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

  const updatePoints = async (username: string, pointsEarned: number) => {
    try {
      const response = await axios.post(`${backendUrl}/update-points`, {
        username,
        pointsEarned,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Pontos atualizados com sucesso!');
      } else {
        console.error('Erro ao atualizar pontos:', response.data.message);
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    console.log('Iniciando a requisição para buscar itens...');
    try {
      const response = await axios.get(`${backendUrl}/items`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Acessa diretamente response.data.items
      const items = response.data; // Aqui estamos pegando os itens da resposta

      // Verifica se items é um array
      if (Array.isArray(items)) {
        console.log('Itens recebidos:', items);
        const formattedItems = items.map(item => ({
          id: item.id,
          title: item.name,
          description: item.description,
          points: item.points_required,
          imageUrl: item.image_url, // Mapeia image_url para imageUrl
        }));
        setItems(formattedItems); // Atualiza o estado com os itens formatados
      } else {
        console.error('A resposta não contém um array de itens.');
      }
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedemption = async (item: Item) => {
    const currentPoints = points;

    if (currentPoints >= item.points) {
      try {
        setIsRedeeming(true);
        await updatePoints('amor', -item.points);
        await insertRedemption('1', item.id, item.points);
        console.log("Resgate feito com sucesso");

        // Exibir alerta personalizado
        setAlertTitle("Parabéns gatinha");
        setAlertMessage("Resgate feito com sucesso!");
        setShowAlert(true);
        await fetchPoints();
        await fetchItems();
      } catch (error) {
        console.error('Erro ao processar resgate:', error);
        setAlertTitle("Erro");
        setAlertMessage("Algo deu errado durante o resgate. Tente novamente.");
        setShowAlert(true);
      } finally {
        setIsRedeeming(false);
      }
    } else {
      console.log("Erro: pontos insuficientes");
      setAlertTitle("Oops");
      setAlertMessage("Você não tem pontos suficientes espertinha kkk");
      setShowAlert(true);
    }
  };

  const insertRedemption = async (userId: string, rewardId: string, pointsRequired: number) => {
    try {
      const response = await axios.post(`${backendUrl}/insert-redemption`, {
        userId,
        rewardId,
        pointsRequired,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Resgate registrado com sucesso!');
      } else {
        console.error('Erro ao registrar resgate:', response.data.message);
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
    }
  };

  const imageMap: Record<ImageKeys, any> = {
    combo_lanche: require('./assets/combo_lanche.png'),
    cinema: require('./assets/cinema.png'),
    massagem: require('./assets/massagem.png'),
    lovenight: require('./assets/lovenight.png'),
    cupom: require('./assets/cupom.png'),
    presente: require('./assets/presente.png'),
    assistir: require('./assets/assistir.png'),
    sobremesa: require('./assets/sobremesa.png'),
  };

  const getImageSource = (imageUrl: string): any => {
    const imageName = imageUrl.split('/').pop()?.split('.')[0]; // Extrai o nome da imagem sem a extensão
    return imageName && imageMap[imageName as ImageKeys]; // Cast para ImageKeys
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPoints();
    await fetchItems();
    setRefreshing(false);
  };


  return (
    <View style={StoreStyles.container}>
      <Header
        leftIcon={require('./assets/game.png')}
        middleIcon={require('./assets/posts.png')}
        rightIcon={require('./assets/profile-user.png')}
        onLeftIconPress={() => navigation.navigate('EarnPoints')}
        onMiddleIconPress={() => navigation.navigate('Posts')}
        onRightIconPress={() => navigation.navigate('Profile')}
        isStoreScreen={true}
      />
      <ScrollView
        style={StoreStyles.storeSection}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={StoreStyles.pointsSection}>
          <Text style={StoreStyles.pointsTitle}>Você tem:</Text>
          <Text style={StoreStyles.points}>
            {loading ? 'Carregando...' : `${points} LovePoints`}
          </Text>
          <LinearGradient
            colors={['transparent', '#00000057', '#FFFFFFFF']} // Gradiente esfumaçado
            style={StoreStyles.border}
          ></LinearGradient>
          <TouchableOpacity onPress={() => navigation.navigate('EarnPoints')}>
            <Text style={StoreStyles.howToEarn}>Como consigo LovePoints?</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <View>
          <Text style={StoreStyles.itemTitle}>Carregando...</Text>
          <View style={StoreStyles.leftSide}>
            <Image source={require('./assets/loading.gif')} style={StoreStyles.itemImage} />
          </View>
          <View style={StoreStyles.rightSide}>
            <Text style={StoreStyles.itemDescription}>Carma aí que ta carregando minha fia</Text>
            <Text style={StoreStyles.itemPoints}>Custa alguma coisa, carma ai uai...</Text>
            <TouchableOpacity
              style={StoreStyles.redeemButton}
            >
              <Text style={StoreStyles.redeemButtonText}>
                Carregando...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        ) : (
          Array.isArray(items) && items.length > 0 ? (
            items.map((item) => (
              <View key={item.id}>
                <Text style={StoreStyles.itemTitle}>{item.title}</Text>
                <View style={StoreStyles.leftSide}>
                  <Image source={getImageSource(item.imageUrl)} style={StoreStyles.itemImage} />
                </View>
                <View style={StoreStyles.rightSide}>
                  <Text style={StoreStyles.itemDescription}>{item.description}</Text>
                  <Text style={StoreStyles.itemPoints}>LovePoints necessários: {item.points}</Text>
                  <TouchableOpacity
                    style={StoreStyles.redeemButton}
                    onPress={() => handleRedemption(item)}
                    disabled={isRedeeming}
                  >
                    <Text style={StoreStyles.redeemButtonText}>
                      {isRedeeming ? 'Resgatando...' : 'Resgatar'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={StoreStyles.noItems}>Nenhum item disponível.</Text>
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
    </View>
  );
  
};

export default Store;
