import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import HomeStyles from './HomeStyles'; // Importando os estilos do Home
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient
import Header from './Header';

interface HomeProps {
    onHeaderLeftIconPress?: () => void;
    onHeaderRightIconPress?: () => void;
}

const Home: React.FC<HomeProps> = ({
    onHeaderLeftIconPress,
    onHeaderRightIconPress,
}) => {
    return (
        <View style={HomeStyles.container}>
            <Header
                leftIcon={require('../assets/store.png')}
                rightIcon={require('../assets/profile-user.png')}
                onLeftIconPress={onHeaderLeftIconPress}
                onRightIconPress={onHeaderRightIconPress}
            />
            <ScrollView contentContainerStyle={HomeStyles.scrollContainer}>
            <LinearGradient
                colors={['#e41d69', '#ff6767', '#fe8277', '#ff6767', '#e41d69']}
                start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
                end={{ x: 1, y: 0 }}
                style={HomeStyles.home} // Usando o estilo do cabeçalho
            >
                <View style={HomeStyles.home}>
                    <View style={HomeStyles.textos}>
                        <Text style={HomeStyles.homeText}>Oi Amor!</Text>
                        <Text style={HomeStyles.homeText}>Transformei o site em um app</Text>
                        <Text style={HomeStyles.homeText}>Espero que goste ❤</Text>
                    </View>
                    <View style={HomeStyles.imagesHome}>
                        <Image
                            source={require('../assets/avatar.png')}
                            style={HomeStyles.avatarImage}
                        />
                    </View>
                </View>
                </LinearGradient>
            </ScrollView>
        </View>
    );
};

export default Home;