// src/navigation.d.ts
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


//Toda vez que criar uma tela nova tem que adicionar a navegação a partir daqui
export type RootStackParamList = {
    Home: undefined;
    Store: undefined;
    Profile: undefined; 
    EarnPoints: undefined;
    Quiz: undefined;
};

//Aqui também
export type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type StoreNavigationProp = StackNavigationProp<RootStackParamList, 'Store'>;
export type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
export type EarnPointsNavigationProp = StackNavigationProp<RootStackParamList, 'EarnPoints'>;
export type QuizNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;