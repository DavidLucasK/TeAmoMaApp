import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import StoreStyles from '../styles/StoreStyles'; // Importando os estilos
import Header from '../components/Header';


interface Item {
  id: string;
  title: string;
  description: string;
  points: number;
  imageUrl: string;
}

interface HeaderProps {
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

const Store: React.FC<HeaderProps> = ({ onLeftIconPress, onRightIconPress }) => {
  const [points, setPoints] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]); // Inicializa como um array vazio

  useEffect(() => {
    fetchPoints();
    fetchItems(); // Chama a função para buscar itens
  }, []);

  const backendUrl = 'https://backendlogindl.vercel.app/api/auth';
  const apiKey = 'YOUR_API_KEY_HERE'; // Substitua pela sua chave de API

  const fetchPoints = async () => {
    console.log('Iniciando a requisição para buscar pontos...');
    try {
      const response = await axios.get(`${backendUrl}/points`, {
        headers: {
          'Content-Type': 'application/json',
          'apiKey': apiKey,
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

  const fetchItems = async () => {
    console.log('Iniciando a requisição para buscar itens...');
    try {
      const response = await axios.get(`${backendUrl}/items`, {
        headers: {
          'Content-Type': 'application/json',
          'apiKey': apiKey,
        },
      });

      // Acessa diretamente response.data.items
      const items = response.data; // Aqui estamos pegando os itens da resposta
      console.log('aqui', items);

      // Verifica se items é um array
      if (Array.isArray(items)) {
        console.log('Itens recebidos:', items);
        const formattedItems = items.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          points: item.points,
          imageUrl: `'${item.image_url}'`, // Mapeia image_url para imageUrl
        }
      ));

      formattedItems.forEach(item => {
        console.log('Image URL:', item.imageUrl); // Mostra cada imageUrl
    });
        
        setItems(formattedItems); // Atualiza o estado com os itens formatados
      } else {
        console.error('A resposta não contém um array de itens.');
      }
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
  };

  const redeemReward = async (itemId: string) => {
    console.log(`Tentando resgatar o item com ID: ${itemId}`);
    try {
      await axios.post(`${backendUrl}/redeem/${itemId}`, null, {
        headers: {
          'Content-Type': 'application/json',
          'apiKey': apiKey,
        },
      });

      console.log('Item resgatado com sucesso!');
      fetchPoints();
      fetchItems(); // Atualiza os itens após resgatar
      showAlert('Item resgatado com sucesso!');
    } catch (error) {
      console.error('Erro ao resgatar item:', error);
      showAlert('Erro ao resgatar item. Tente novamente mais tarde.');
    }
  };

  const showAlert = (message: string) => {
    Alert.alert('Loja de Itens', message);
  };

  return (
    <View style={StoreStyles.container}>
      <Header
        leftIcon={require('./assets/game.png')}
        rightIcon={require('./assets/profile-user.png')}
        onLeftIconPress={onLeftIconPress}
        onRightIconPress={onRightIconPress}
      />
      <View style={StoreStyles.pointsSection}>
        <Text style={StoreStyles.pointsTitle}>Você tem:</Text>
        <Text style={StoreStyles.points}>{points} LovePoints</Text>
        <TouchableOpacity onPress={() => {/* Navegar para a tela de como ganhar pontos */}}>
          <Text style={StoreStyles.howToEarn}>Como consigo LovePoints?</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={StoreStyles.storeSection}>
        {Array.isArray(items) && items.length > 0 ? ( 
          items.map((item) => (
            <View key={item.id} style={StoreStyles.item}>
              <View style={StoreStyles.leftSide}>
                <Image source={requireditem.imageUrl} style={StoreStyles.itemImage} />
              </View>
              <View style={StoreStyles.rightSide}>
                <Text style={StoreStyles.itemTitle}>{item.title}</Text>
                <Text style={StoreStyles.itemDescription}>{item.description}</Text>
                <Text style={StoreStyles.itemPoints}>LovePoints necessários: {item.points}</Text>
                <TouchableOpacity
                  style={StoreStyles.redeemButton}
                  onPress={() => redeemReward(item.id)}
                >
                  <Text style={StoreStyles.redeemButtonText}>Resgatar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={StoreStyles.noItemsText}>Nenhum item disponível no momento.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Store;