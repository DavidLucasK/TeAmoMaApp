import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import EditPerguntaQuizStyles from '../styles/EditPerguntaQuizStyles';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import { EditPerguntaQuizNavigationProp, RootStackParamList } from '../navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type EditPerguntaQuizRouteProp = RouteProp<RootStackParamList, 'EditPerguntaQuiz'>;

const EditPerguntaQuiz = () => {
    const navigation = useNavigation<EditPerguntaQuizNavigationProp>();
    const route = useRoute<EditPerguntaQuizRouteProp>(); // Para acessar os parâmetros da rota
    const { perguntaId } = route.params;

    const [titlePergunta, setTitlePergunta] = useState<string>('pergunta');
    return (
        <View style={EditPerguntaQuizStyles.container}>
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
            style={EditPerguntaQuizStyles.content} // Usando o estilo do cabeçalho
          >
            <Text>asoiudhas</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditQuiz')}>
              <Text>Voltar</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity>
                <TextInput value={titlePergunta} onChangeText={setTitlePergunta} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      );
};


export default EditPerguntaQuiz;