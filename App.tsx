import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar } from 'react-native';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins'; // Importando as fontes Poppins

import LoadingScreen from './src/screens/LoadingScreen'; // Importando a tela de carregamento
import Home from './src/screens/Home'; // Importando o componente Home
import Store from './src/screens/Store'; // Importando o componente Store
import Profile from './src/screens/Profile'; // Importando o componente Profile
import EarnPoints from './src/screens/EarnPoints';
import Quiz from './src/screens/Quiz';
import Posts from './src/screens/Posts';
import CreatePost from './src/screens/CreatePost';

const Stack = createStackNavigator();
const backendUrl = 'https://backendlogindl.vercel.app/api/auth'; // Certifique-se de que o backendUrl esteja correto

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar a tela de carregamento
    const [loading, setLoading] = useState(false); // Estado para indicar se os posts estão sendo carregados
    const [posts, setPosts] = useState([]); // Estado para armazenar os posts
    const [prevPosts, setPrevPosts] = useState([]); // Estado para armazenar os posts anteriores
    const [lastNotifiedPostId, setLastNotifiedPostId] = useState(null);

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold, // Certifique-se de incluir todas as variantes que você deseja usar
    });

    const handleLoadingComplete = (status: boolean) => {
        if (status) {
            setIsLoading(false); // Oculta a tela de carregamento
        }
    };

    // Configuração de notificação
    useEffect(() => {
        const registerForPushNotificationsAsync = async () => {
            if (Device.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;

                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }

                if (finalStatus !== 'granted') {
                    console.log('Falha ao obter a permissão para notificações!');
                    return;
                }

                const token = (await Notifications.getExpoPushTokenAsync()).data;
                console.log('Token de notificação:', token);
            } else {
                alert('Notificações push não são suportadas em simuladores!');
            }

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }
        };

        registerForPushNotificationsAsync();
    }, []);

    const sendNotification = async (title: string, body: string) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
            },
            trigger: null, // Dispara a notificação imediatamente
        });
    };

    const fetchPosts = async () => {
        console.log('Buscando posts');
        try {
            const response = await axios.get(`${backendUrl}/posts`);
            let newPosts = response.data;
    
            // Ordena os posts por data em ordem decrescente
            const sortedPosts = newPosts.sort((a: any, b: any) => {
                return new Date(b.data).getTime() - new Date(a.data).getTime();
            });
    
            // console.log(sortedPosts);
    
            // Verifica se há novos posts com o username "Avix"
            const avixPosts = sortedPosts.filter((post: any) => post.username === "Avix");
    
            if (avixPosts.length > 0) {
                // Identifica se algum dos posts de "Avix" ainda não estava na lista anterior
                const newAvixPosts = avixPosts.filter((post: any) => {
                    return !prevPosts.some((prevPost: any) => prevPost.id === post.id);
                });
    
                if (newAvixPosts.length > 0) {
                    const latestPost = newAvixPosts[0]; // Seleciona o post mais recente de Avix
                    console.log(newAvixPosts)
    
                    // Verifica se já notificamos esse post
                    if (lastNotifiedPostId !== latestPost.id) {
                        sendNotification("Novo post do gatinho!", `Avix: "${latestPost.desc_foto}"`);
                        console.log(latestPost.desc_foto)
                        setLastNotifiedPostId(latestPost.id); // Armazena o ID do post notificado
                    }
                }
            }
    
            setPrevPosts(sortedPosts); // Atualiza os posts anteriores com os posts atuais
            setPosts(sortedPosts); // Atualiza o estado dos posts
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
        } finally {
            setLoading(false); // Define o carregamento como falso
        }
    };

    // Faz a busca inicial de posts e configura a verificação periódica
    useEffect(() => {
        fetchPosts(); // Busca os posts inicialmente

        // Configura a verificação de novos posts a cada 10 segundos
        const intervalId = setInterval(fetchPosts, 60000); // 10 segundos

        return () => clearInterval(intervalId); // Limpa o intervalo quando o componente for desmontado
    }, []);

    return (
        <NavigationContainer>
            {isLoading ? (
                <LoadingScreen onComplete={handleLoadingComplete} />
            ) : (
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        gestureEnabled: false, // Desabilita os gestos de navegação
                        cardStyleInterpolator: () => ({ // Retorna um estilo sem animação
                            cardStyle: {
                                opacity: 1, // Mantém a opacidade
                            },
                        }),
                    }}
                >
                    <Stack.Screen 
                        name="Home" 
                        component={Home} 
                        options={{ headerShown: false }} // Removendo o cabeçalho padrão
                    />
                    <Stack.Screen 
                        name="Store"
                        component={Store}
                        options={{ headerShown: false }} // Removendo o cabeçalho padrão
                    />
                    <Stack.Screen 
                        name="Profile"
                        component={Profile}
                        options={{ headerShown: false }} // Removendo o cabeçalho padrão
                    />
                    <Stack.Screen 
                        name="EarnPoints"
                        component={EarnPoints}
                        options={{ headerShown: false }} // Removendo o cabeçalho padrão
                    />
                    <Stack.Screen 
                        name="Quiz"
                        component={Quiz}
                        options={{ headerShown: false }} // Removendo o cabeçalho padrão
                    />
                    <Stack.Screen 
                        name="Posts"
                        component={Posts}
                        options={{ headerShown: false }} // Removendo o cabeçalho padrão
                    />
                    <Stack.Screen 
                        name="CreatePost"
                        component={CreatePost}
                        options={{ headerShown: false }} // Removendo o cabeçalho padrão
                    />
                </Stack.Navigator>
            )}
            <StatusBar
                barStyle="light-content" // Define o estilo do conteúdo da barra de status
                backgroundColor="transparent" // Cor de fundo da barra de status
                translucent={true} // Deixa a barra de status translúcida
            />
        </NavigationContainer>
    );
};

export default App;
