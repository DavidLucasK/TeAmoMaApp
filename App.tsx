import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins'; // Importando as fontes Poppins

import LoadingScreen from './src/screens/LoadingScreen'; // Importando a tela de carregamento
import Home from './src/screens/Home'; // Importando o componente Home
import Store from './src/screens/Store'; // Importando o componente Store
import Profile from './src/screens/Profile'; // Importando o componente Profile
import EarnPoints from './src/screens/EarnPoints';
import Quiz from './src/screens/Quiz';
import Posts from './src/screens/Posts';

const Stack = createStackNavigator();

preventAutoHideAsync();

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar a tela de carregamento

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

    useEffect(() => {
        // Ocultar a StatusBar após o carregamento completo das fontes
        if (!isLoading && fontsLoaded) {
            hideAsync();
        }
    }, [isLoading, fontsLoaded]);

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
                </Stack.Navigator>
            )}
            <StatusBar style="light" backgroundColor="transparent" translucent={true} />
        </NavigationContainer>
    );
};

export default App;