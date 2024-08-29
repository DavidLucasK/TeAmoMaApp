// src/navigation.d.ts
import { StackNavigationProp } from '@react-navigation/stack';


//Toda vez que criar uma tela nova tem que adicionar a navegação a partir daqui
export type RootStackParamList = {
    Home: undefined; // A tela Home não espera parâmetros
    Store: undefined; // A tela Store também não espera parâmetros
    Profile: undefined; // A tela Store também não espera parâmetros
};

//Aqui também
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type StoreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Store'>;
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;