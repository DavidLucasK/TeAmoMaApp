import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import PostsStyles from '../styles/PostsStyles'; // Importando os estilos do Home
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation
import { PostsNavigationProp } from '../navigation'; // Importando o tipo de navegação
import Header from '../components/Header';


const Posts: React.FC = () => {
    const navigation = useNavigation<PostsNavigationProp>(); // Usando o tipo de navegação para HomeScreen

    return (
        <View style={PostsStyles.container}>
            <Header
                leftIcon={require('./assets/store.png')}
                middleIcon={require('./assets/game.png')}
                rightIcon={require('./assets/profile-user.png')}
                onLeftIconPress={() => navigation.navigate('Store')} // Passando a função
                onMiddleIconPress={() => navigation.navigate('EarnPoints')}
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            <ScrollView contentContainerStyle={PostsStyles.scrollContainer}>
                <LinearGradient
                    colors={['#e41d69', '#fe8277']}
                    start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
                    end={{ x: 1, y: 0 }}
                    style={PostsStyles.main} // Usando o estilo do cabeçalho
                >
                    <View style={PostsStyles.main}>
                        <ScrollView>
                            <View style={PostsStyles.postsContainer}>
                                <View style={PostsStyles.post}>
                                    <Image style={PostsStyles.imagePost} source={require('./assets/cinema.png')} />
                                    <Text style={PostsStyles.textBottom}>Oi legal maneiro top</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </ScrollView>
        </View>
    );
};

export default Posts;