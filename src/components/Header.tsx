import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient
import { HomeNavigationProp } from '../navigation'; // Importando os tipos de navegação
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation

import HeaderStyles from '../styles/HeaderStyles'; // Importando os estilos do cabeçalho

interface HeaderProps {
    leftIcon?: any; 
    rightIcon?: any;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
    isStoreScreen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ leftIcon, rightIcon, onLeftIconPress, onRightIconPress, isStoreScreen }) => {
    const navigation = useNavigation<HomeNavigationProp>(); // Usando o tipo de navegação

    const handleLogoPress = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], // Redefine a navegação para a tela Home
        });
    };

    const handleLeftIconPress = () => {
        if (isStoreScreen) {
            if (onLeftIconPress) {
                onLeftIconPress(); // Chama a função de callback se isStoreScreen for true e onLeftIconPress estiver definido
            }
        } else {
            navigation.navigate('Store');
        }
    };

    return (
        <LinearGradient
            colors={['#e41d69', '#fe8277']}
            start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
            end={{ x: 1, y: 0 }}
            style={[HeaderStyles.header]} // Usando o estilo do cabeçalho
        >
            <View style={HeaderStyles.headerContent}>
                <TouchableOpacity onPress={handleLogoPress}>
                    <Text style={HeaderStyles.logo}>Te amo Ma</Text>
                </TouchableOpacity>
                <View style={HeaderStyles.icons}>
                    {leftIcon && (
                        <TouchableOpacity onPress={onLeftIconPress}>
                            <Image source={leftIcon} style={HeaderStyles.icon} />
                        </TouchableOpacity>
                    )}
                    {rightIcon && (
                        <TouchableOpacity onPress={onRightIconPress}>
                            <Image source={rightIcon} style={HeaderStyles.icon} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </LinearGradient>
    );
};

export default Header;