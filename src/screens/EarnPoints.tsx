import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient
import EarnPointsStyles from '../styles/EarnPointsStyles';
import CustomAlert from '../components/CustomAlert';
import Header from '../components/Header';
import { EarnPointsNavigationProp } from '../navigation'; // Importando o tipo de navegação
import { useAppContext } from '../context/AppContext';

interface HeaderProps {
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
  }

  
const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

const EarnPoints: React.FC = () => {
    const navigation = useNavigation<EarnPointsNavigationProp>();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertTitle, setAlertTitle] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [quizStatus, setQuizStatus] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const { user } = useAppContext();

    const fetchQuizStatus = async () => {
        try {
            const response = await fetch(`${backendUrl}/quiz-status/${user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Falha ao buscar status do quiz.');

            const data = await response.json();
            setQuizStatus(data.is_completed);
        } catch (error) {
            console.error('Erro:', error);
            setQuizStatus(false);
        }
    };

    const checkQuizStatus = () => {
        console.log(quizStatus)
        if (quizStatus) {
            setAlertTitle('Você já completou o quiz hoje!');
            setAlertMessage('Volte amanhã ❤️');
            setShowAlert(true);
            return true; // Retorna true se o quiz foi completado
        } else {
            setLoading(false);
            return false; // Retorna false se o quiz não foi completado
        }
    };

    return (
        <View style={EarnPointsStyles.container}>
            <Header
                leftIcon={require('./assets/editingWhite.png')}
                middleIcon={require('./assets/store.png')}
                rightIcon={require('./assets/profile-user.png')}
                onLeftIconPress={() => navigation.navigate('EditQuiz')}
                onMiddleIconPress={() => navigation.navigate('Store')} // Passando a função
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            <LinearGradient
                colors={['#e41d69', '#fe8277']}
                start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
                end={{ x: 1, y: 0 }}
                style={EarnPointsStyles.content} // Usando o estilo do cabeçalho
            >
                <View style={EarnPointsStyles.content}>
                    <Text style={EarnPointsStyles.title}>Minigames</Text>
                    <View style={EarnPointsStyles.games}>
                        <View style={EarnPointsStyles.card}>
                            <Text style={EarnPointsStyles.cardTitle}>Quiz</Text>
                            <Text style={EarnPointsStyles.cardText}>Responda perguntas e ganhe LovePoints!</Text>
                            <TouchableOpacity
                                style={EarnPointsStyles.button}
                                onPress={() => {
                                    if (!checkQuizStatus()) {
                                        navigation.navigate('Quiz'); // Navega para a tela Quiz se o quiz não foi completado
                                    }
                                }}
                            >
                                <Text style={EarnPointsStyles.buttonText}>Jogar</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <View style={[EarnPointsStyles.card, EarnPointsStyles.disabledCard]}>
                                    <Text style={EarnPointsStyles.cardTitle}>Em breve</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            <CustomAlert
                visible={showAlert}
                title={alertTitle}
                message={alertMessage}
                onClose={() => setShowAlert(false)}
            />
        </View>
    );
};

export default EarnPoints;