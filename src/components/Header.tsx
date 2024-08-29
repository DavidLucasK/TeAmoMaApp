import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient
import HeaderStyles from './HeaderStyles'; // Importando os estilos do cabeçalho
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation
import { HomeScreenNavigationProp } from '../navigation'; // Importando os tipos de navegação

interface HeaderProps {
    leftIcon?: any; 
    rightIcon?: any;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ leftIcon, rightIcon, onRightIconPress }) => {
    const navigation = useNavigation<HomeScreenNavigationProp>(); // Usando o tipo de navegação

    const handleLogoPress = () => {
        navigation.navigate('Home'); // Navegando para a tela "Home"
    };

    const onLeftIconPress = () => {
        navigation.navigate('Store');
    }

    return (
        <LinearGradient
            colors={['#e41d69', '#ff6767', '#fe8277', '#ff6767', '#e41d69']}
            start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
            end={{ x: 1, y: 0 }}
            style={[HeaderStyles.header]} // Usando o estilo do cabeçalho
        >
            <View style={HeaderStyles.headerContent}>
                <TouchableOpacity onPress={handleLogoPress}>
                    <Text style={HeaderStyles.logo}>TeAmoMa</Text>
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