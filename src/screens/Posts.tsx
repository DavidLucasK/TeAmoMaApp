import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import PostsStyles from '../styles/PostsStyles'; // Importando os estilos do Home
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation
import { PostsNavigationProp } from '../navigation'; // Importando o tipo de navegação
import Header from '../components/Header';

const Posts: React.FC = () => {
    const navigation = useNavigation<PostsNavigationProp>(); // Usando o tipo de navegação para HomeScreen
    const [likedPosts, setLikedPosts] = useState<number[]>([]);

    const toggleLike = (postId: number) => {
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter((id) => id !== postId));
        } else {
            setLikedPosts([...likedPosts, postId]);
        }
    };

    const posts = [
        { id: 1, user: 'Mazinha02', tempo: '12 horas', imageSource: require('./assets/teamo1.png'), text: 'Oi amor te amo muito, tá?' },
        { id: 2, user: 'Mazinha02', tempo: '12 horas', imageSource: require('./assets/teamo2.png'), text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cum odit unde veritatis omnis optio fugit a. Corporis quia illum aspernatur omnis, distinctio assumenda sunt praesentium commodi. Corporis, eveniet quaerat!' },
        { id: 3, user: 'Mazinha02', tempo: '12 horas', imageSource: require('./assets/sobremesa.png'), text: 'Texto post 2' },
        { id: 4, user: 'Mazinha02', tempo: '12 horas', imageSource: require('./assets/cinema.png'), text: 'Oi amor te amo muito, tá?' },
    ];

    return (
        <View style={PostsStyles.container}>
            <Header
                leftIcon={require('./assets/store.png')}
                middleIcon={require('./assets/game.png')}
                rightIcon={require('./assets/profile-user.png')}
                onLeftIconPress={() => navigation.navigate('Store')}
                onMiddleIconPress={() => navigation.navigate('EarnPoints')}
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            <ScrollView contentContainerStyle={PostsStyles.scrollContainer}>
                <LinearGradient
                    colors={['#e41d69', '#fe8277']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={PostsStyles.main}
                >
                    <View style={PostsStyles.main}>
                        <ScrollView>
                            <View style={PostsStyles.postsContainer}>
                                <TouchableOpacity style={PostsStyles.plusBtn}>
                                    <Image style={PostsStyles.plus} source={require('./assets/plus.png')} />
                                </TouchableOpacity>
                                {posts.map((post) => (
                                    <View key={post.id} style={PostsStyles.post}>
                                        <Text style={PostsStyles.user}>{post.user}</Text>
                                        <Text style={PostsStyles.tempo}>Há {post.tempo}</Text>
                                        <View style={PostsStyles.imageContainer}>
                                            <Image style={PostsStyles.imagePost} source={post.imageSource} />
                                        </View>
                                        <Text style={PostsStyles.textBottom}>{post.text}</Text>
                                        <View style={PostsStyles.iconsContainer}>
                                            <TouchableOpacity onPress={() => toggleLike(post.id)}>
                                                <Image
                                                    style={PostsStyles.iconsContainer}
                                                    source={
                                                        likedPosts.includes(post.id)
                                                            ? require('./assets/heartFilled.png')
                                                            : require('./assets/heartNoFill.png')
                                                    }
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </ScrollView>
        </View>
    );
};

export default Posts;