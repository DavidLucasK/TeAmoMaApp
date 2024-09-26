import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import EditQuizStyles from '../styles/EditQuizStyles';
import Header from '../components/Header';
import { EditQuizNavigationProp } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '../context/AppContext';

const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

const EditQuiz: React.FC = () => {
  const navigation = useNavigation<EditQuizNavigationProp>(); 
  const [titlePergunta, setTitlePergunta] = useState<string>('pergunta');
  const [questions, setQuestions] = useState<any[]>([]);
  const { user, partnerId, setPartnerId } = useAppContext();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
        const response = await fetch(`${backendUrl}/questionsAll/${partnerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Falha ao buscar perguntas.');

        const data = await response.json();
        setQuestions(data);
    } catch (error) {
        console.error('Erro:', error);
    }
  };

  return (
    <View style={EditQuizStyles.container}>
      <Header
          leftIcon={require('./assets/game.png')}
          middleIcon={require('./assets/store.png')}
          rightIcon={require('./assets/profile-user.png')}
          onLeftIconPress={() => navigation.navigate('EarnPoints')}
          onMiddleIconPress={() => navigation.navigate('Store')} // Passando a função
          onRightIconPress={() => navigation.navigate('Profile')}
          isStoreScreen={false}
      />
      <LinearGradient
        colors={['#e41d69', '#fe8277']}
        start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
        end={{ x: 1, y: 0 }}
        style={EditQuizStyles.content} // Usando o estilo do cabeçalho
      >
        <ScrollView style={{ flex: 1 }}>
          {/* Renderização das perguntas */}
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={EditQuizStyles.questionContainer}
                onPress={() => navigation.navigate('EditPerguntaQuiz', { perguntaId: question.id })}
              >
                <Text style={EditQuizStyles.questionText}>{question.pergunta}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={EditQuizStyles.noQuestionsText}>Nenhuma pergunta encontrada.</Text>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default EditQuiz;
