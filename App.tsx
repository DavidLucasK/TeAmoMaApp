import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home'; // Importando o componente Home
import Store from './src/components/Store'; // Importando o componente Store
import Header from './src/components/Header'; // Importando o componente Header

const Stack = createStackNavigator();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Store">
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;