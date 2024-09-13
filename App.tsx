import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import LoadingScreen from './src/screens/LoadingScreen'; // Tela de carregamento
import Home from './src/screens/Home'; // Tela Home
import Store from './src/screens/Store'; // Tela Store
import Profile from './src/screens/Profile'; // Tela Profile
import EarnPoints from './src/screens/EarnPoints'; // Tela EarnPoints
import Quiz from './src/screens/Quiz'; // Tela Quiz
import Posts from './src/screens/Posts'; // Tela Posts
import CreatePost from './src/screens/CreatePost'; // Tela CreatePost
import IndividualPost from './src/screens/IndividualPost'; // Tela IndividualPost
import Login from './src/screens/Login'; // Tela Login
import { AppProvider } from './src/context/AppContext'; // AppProvider

const Stack = createStackNavigator();
const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para controle de carregamento
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Estado de login

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken'); // Verifica se o token está salvo
                if (token) {
                    setIsLoggedIn(true); // Define como logado se o token existir
                }
            } catch (error) {
                console.error('Erro ao verificar o token:', error);
            } finally {
                setIsLoading(false); // Carregamento concluído
            }
        };

        checkLoginStatus(); // Chama a função para verificar o login
    }, []);

    if (!fontsLoaded || isLoading) {
        return <LoadingScreen onComplete={() => setIsLoading(false)} />; // Tela de carregamento enquanto carrega fontes ou checa o login
    }

    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={isLoggedIn ? "Home" : "Login"} // Redireciona para Home ou Login
                    screenOptions={{
                        gestureEnabled: false,
                        cardStyleInterpolator: () => ({
                            cardStyle: {
                                opacity: 1,
                            },
                        }),
                    }}
                >
                    <Stack.Screen 
                        name="Home" 
                        component={Home} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="Store"
                        component={Store}
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="Profile"
                        component={Profile}
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="EarnPoints"
                        component={EarnPoints}
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="Quiz"
                        component={Quiz}
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="Posts"
                        component={Posts}
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="CreatePost"
                        component={CreatePost}
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="IndividualPost"
                        component={IndividualPost}
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }} 
                    />
                </Stack.Navigator>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent={true}
                />
            </NavigationContainer>
        </AppProvider>
    );
};

export default App;
