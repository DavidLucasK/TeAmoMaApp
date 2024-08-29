// src/navigation.d.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined; // A tela Home não espera parâmetros
    Store: undefined; // A tela Store também não espera parâmetros
    Profile: undefined; // A tela Store também não espera parâmetros
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type StoreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Store'>;
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;