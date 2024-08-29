import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import StoreStyles from '../styles/StoreStyles'; // Importando os estilos
import Header from '../components/Header';

interface Reward {
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
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    fetchPoints();
    fetchRewards();
  }, []);

  const fetchPoints = async () => {
    console.log('Iniciando a requisição para buscar pontos...');
    try {
      const response = await axios.get('/points');
      console.log('Pontos recebidos:', response.data.points);
      setPoints(response.data.points);
    } catch (error) {
      console.error('Erro ao buscar pontos:', error);
    }
  };

  const fetchRewards = async () => {
    console.log('Iniciando a requisição para buscar recompensas...');
    try {
      const response = await axios.get('/rewards');
      console.log('Recompensas recebidas:', response.data.rewards);
      setRewards(response.data.rewards);
    } catch (error) {
      console.error('Erro ao buscar recompensas:', error);
    }
  };

  const redeemReward = async (rewardId: string) => {
    console.log(`Tentando resgatar a recompensa com ID: ${rewardId}`);
    try {
      await axios.post(`/redeem/${rewardId}`);
      console.log('Recompensa resgatada com sucesso!');
      fetchPoints();
      fetchRewards();
      showAlert('Reward redeemed successfully!');
    } catch (error) {
      console.error('Erro ao resgatar recompensa:', error);
      showAlert('Error redeeming reward. Please try again later.');
    }
  };

  const showAlert = (message: string) => {
    Alert.alert('Loja de Recompensas', message);
  };

  return (
    <View style={StoreStyles.container}>
      <Header
        leftIcon={require('../assets/game.png')}
        rightIcon={require('../assets/profile-user.png')}
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
        {/* Resto do código */}
      </ScrollView>
    </View>
  );
};

export default Store;