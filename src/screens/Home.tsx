import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import HomeStyles from '../styles/HomeStyles'; // Importando os estilos do Home
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation
import { HomeNavigationProp } from '../navigation'; // Importando o tipo de navegação
import Header from '../components/Header';


const Home: React.FC = () => {
    const navigation = useNavigation<HomeNavigationProp>(); // Usando o tipo de navegação para HomeScreen
    const [typedText, setTypedText] = useState<string>('');
    const [hasViappd, setHasViappd] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const textos1 = [
        'Oi gatinha!',
        'Transformei o site em um app',
        'Espero que você goste! ❤️',
    ];
    
    const textos2 = [
        'Oi de novo!',
        'Espero que esteja gostando amor.',
        'Lembre-se sempre: Eu te amo, tá?',
    ];
    
    const textos3 = [
        'Bem-vinda novamente gatinha!',
        'Estou feliz que você esteja usando o app hehe.',
        'Tem alguma sugestão pra loja? Me chama!'
    ];
    
    const textos4 = [
        'Olá amor da minha vida!',
        'Tá gostando do app que fiz pra você?',
        'Me da um beijinho então rs ❤'
    ];
    
    const textos5 = [
        'Oi minha princesa!',
        'Gostei de criar coisas pra você.',
        'Espero que esteja se divertindo com o app!'
    ];
    
    const textos6 = [
        'Oi meu bem!',
        'Cada detalhe desse app foi pensado em você.',
        'Você é a razão de tudo isso ❤'
    ];
    
    const textos7 = [
        'Ei, amorzinho!',
        'Seu sorriso é o que me inspira.',
        'Me avisa se tiver alguma idéia diferente pro app!'
    ];
    
    const textos8 = [
        'Oiiie gatona!',
        'Estou sempre pensando em novas idéias pra te surpreender.',
        'Me fala o que você ta achando até agora, blz?'
    ];
    
    const textos9 = [
        'Oi, amor da minha vida!',
        'Esse app é só mais uma forma de mostrar como te amo.',
        'Quero que cada visita sua seja especial e que você se divirta!'
    ];
    
    const textos10 = [
        'Oi, gatenhaaaa ❤',
        'Me diverti criando essas coisas pra te ver feliz.',
        'Você merece o melhor, sempre. ❤'
    ];
    
    const textos11 = [
        'Oi meu nenééémmm',
        'Te amo muito tá?',
        'Me chama no whats, to com saudades de você 😔'
    ];

    useEffect(() => {
        const checkViappd = async () => {
            try {
                const viappd = await AsyncStorage.getItem('hasViappd');
                if (viappd) {
                    setHasViappd(true);
                } else {
                    await AsyncStorage.setItem('hasViappd', 'true'); // Marca como visitado após a primeira visita
                }
            } catch (error) {
                console.error('Erro ao acessar AsyncStorage:', error);
            }
        };
    
        checkViappd();
    }, []); // Executa apenas uma vez ao montar o componente

    useEffect(() => {
        if (!isTyping) { // Inicia a digitação apenas se o usuário já visitou e não está digitando
            const selectedTextos = getRandomTextos(); // Seleciona textos aleatórios
            let currentLine = 0;

            const startTyping = () => {
                if (currentLine < selectedTextos.length) {
                    typeWriter(selectedTextos[currentLine], 0, () => {
                        currentLine++;
                        startTyping(); // Inicia a próxima linha
                    });
                }
            };

            setIsTyping(true); // Marca que a digitação começou
            startTyping(); // Inicia a digitação
        }
    }, [hasViappd, isTyping]); // Executa quando hasViappd muda
    

    // Função para selecionar um array de textos aleatório
    const getRandomTextos = () => {
        if (!hasViappd) {
            return textos1; // Retorna textos1 se for a primeira visita
        }
        const randomIndex = Math.floor(Math.random() * 10); // Gera um número aleatório entre 0 e 9
        switch (randomIndex) {
            case 0:
                return textos2;
            case 1:
                return textos3;
            case 2:
                return textos4;
            case 3:
                return textos5;
            case 4:
                return textos6;
            case 5:
                return textos7;
            case 6:
                return textos8;
            case 7:
                return textos9;
            case 8:
                return textos10;
            case 9:
                return textos11;
            default:
                return textos1; // Fallback
        }
    };

    const typeWriter = (text: string, index: number, callback: () => void) => {
        if (index < text.length) {
            setTypedText((prev) => prev + text[index]); // Adiciona o próximo caractere
            setTimeout(() => typeWriter(text, index + 1, callback), 20); // Tempo de digitação
        } else {
            // Quando a linha é completada, chama o callback após um pequeno atraso
            setTimeout(() => {
                setTypedText((prev) => prev + '\n'); // Adiciona uma nova linha após cada texto
                callback();
            }, 1000); // Tempo de espera antes de iniciar a próxima linha (1 segundo)
        }
    };

    return (
        <View style={HomeStyles.container}>
            <Header
                leftIcon={require('./assets/store.png')}
                rightIcon={require('./assets/profile-user.png')}
                onLeftIconPress={() => navigation.navigate('Store')} // Passando a função
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            <ScrollView contentContainerStyle={HomeStyles.scrollContainer}>
                <LinearGradient
                    colors={['#e41d69', '#fe8277']}
                    start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
                    end={{ x: 1, y: 0 }}
                    style={HomeStyles.home} // Usando o estilo do cabeçalho
                >
                    <View style={HomeStyles.home}>
                        <View style={HomeStyles.textos}>
                            <Text style={HomeStyles.homeText}>
                                {typedText}
                            </Text>
                        </View>
                        <View style={HomeStyles.imagesHome}>
                            <Image
                                source={require('./assets/avatar.png')}
                                style={HomeStyles.avatarImage}
                            />
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </View>
    );
};

export default Home;