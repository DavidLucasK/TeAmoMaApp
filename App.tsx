import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { preventAutoHideAsync } from 'expo-splash-screen';


import LoadingScreen from './src/screens/LoadingScreen'; // Importando a tela de carregamento
import Home from './src/screens/Home'; // Importando o componente Home
import Store from './src/screens/Store'; // Importando o componente Home
import Profile from './src/screens/Profile';



const Stack = createStackNavigator();

preventAutoHideAsync();

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar a tela de carregamento

    const handleLoadingComplete = (status: boolean) => {
        if (status) {
            setIsLoading(false); // Oculta a tela de carregamento
        }
    };

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
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default App;