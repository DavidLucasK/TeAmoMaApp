import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import PostsStyles from '../styles/PostsStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import { PostsNavigationProp } from '../navigation';
import Header from '../components/Header';
import axios from 'axios';
import { formatDistanceToNow, parseISO } from 'date-fns';

const Posts: React.FC = () => {
    const navigation = useNavigation<PostsNavigationProp>();
    const isFocused = useIsFocused();
    const [posts, setPosts] = useState<any[]>([]);
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const [lastPress, setLastPress] = useState(0);
    const [animations, setAnimations] = useState<{ [key: number]: { heart: Animated.Value; scale: Animated.Value } }>({});
    const [loading, setLoading] = useState(true); // Adiciona estado de carregamento

    const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

    // Função para buscar os posts da API
    const fetchPosts = async () => {
        setLoading(true); // Define o carregamento como verdadeiro
        try {
            console.log('tentando pegar os posts');
            const response = await axios.get(`${backendUrl}/posts`);
            const posts = response.data;

            // Ordena os posts por data em ordem decrescente
            const sortedPosts = posts.sort((a: any, b: any) => {
                return new Date(b.data).getTime() - new Date(a.data).getTime();
            });

            console.log(sortedPosts);
            setPosts(sortedPosts);
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
        } finally {
            setLoading(false); // Define o carregamento como falso
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [])
    );

    const toggleLike = (postId: number) => {
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter((id) => id !== postId));
        } else {
            setLikedPosts([...likedPosts, postId]);
        }
    };

    const animateHeart = (postId: number) => {
        const heartAnimation = new Animated.Value(0);
        const scaleAnimation = new Animated.Value(1);

        setAnimations((prev) => ({
            ...prev,
            [postId]: { heart: heartAnimation, scale: scaleAnimation },
        }));

        Animated.parallel([
            Animated.timing(heartAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnimation, {
                toValue: 1.1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            Animated.timing(scaleAnimation, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            }).start(() => {
                Animated.timing(heartAnimation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setAnimations((prev) => {
                        const newAnimations = { ...prev };
                        delete newAnimations[postId];
                        return newAnimations;
                    });
                });
            });
        });
    };

    const handleDoublePress = (postId: number) => {
        const time = new Date().getTime();
        if (time - lastPress < 300) {
            toggleLike(postId);
            if (!likedPosts.includes(postId)) {
                animateHeart(postId);
            }
        }
        setLastPress(time);
    };

    const calculateTimeAgo = (postDate: string) => {
        // Converte a string da data para um objeto Date
        const postDateParsed = parseISO(postDate);
        // Adiciona 8 horas à data do post
        const adjustedPostDate = postDateParsed;
        // Calcula o tempo passado desde a data ajustada do post
        let timeAgo = formatDistanceToNow(adjustedPostDate, { addSuffix: true });

        // Replace para mudar tudo que tiver em inglês para português
        timeAgo = timeAgo
            .replace('less than a', 'menos de um')
            .replace('minutes', 'minutos')
            .replace('minute', 'minuto')
            .replace('hours', 'horas')
            .replace('hour', 'hora')
            .replace('days', 'dias')
            .replace('day', 'dia')
            .replace('ago', 'atrás')
            .replace('in ', '')
            .replace('about ', '');

        return timeAgo;
    };

    return (
        <View style={PostsStyles.container}>
            <Header
                leftIcon={require('./assets/store.png')}
                middleIcon={require('./assets/posts.png')}
                rightIcon={require('./assets/profile-user.png')}
                onLeftIconPress={() => navigation.navigate('Store')}
                onMiddleIconPress={() => navigation.navigate('Posts')}
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            <LinearGradient
                colors={['#e41d69', '#fe8277']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={PostsStyles.main}
            >
                <View style={PostsStyles.main}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={PostsStyles.postsContainer}>
                            <TouchableOpacity style={PostsStyles.plusBtn} onPress={() => navigation.navigate('CreatePost')}>
                                <Image style={PostsStyles.plus} source={require('./assets/plus.png')} />
                            </TouchableOpacity>
                            {loading ? ( // Verifica se está carregando
                                <View style={PostsStyles.post}>
                                    <Text style={PostsStyles.user}>Carregando...</Text>
                                    <Text style={PostsStyles.tempo}>Carregando...</Text>
                                    <View style={PostsStyles.imageContainer}>
                                        <TouchableOpacity>
                                            <View style={PostsStyles.loadingImage}/>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={PostsStyles.textBottom}>Carregando...</Text>
                                    <View style={PostsStyles.iconsContainer}>
                                        <TouchableOpacity>
                                            <Image
                                                style={PostsStyles.iconsContainer}
                                                source={require('./assets/heartNoFill.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={PostsStyles.bordaBottom}></View>
                                </View>
                            ) : (
                                posts.length > 0 ? (
                                    posts.map((post: any) => {
                                        const animation = animations[post.id];
                                        return (
                                            <View key={post.id} style={PostsStyles.post}>
                                                <Text style={PostsStyles.user}>{post.username}</Text>
                                                <Text style={PostsStyles.tempo}>{calculateTimeAgo(post.data)}</Text>
                                                <View style={PostsStyles.imageContainer}>
                                                    <TouchableOpacity onPress={() => handleDoublePress(post.id)}>
                                                        <Image style={PostsStyles.imagePost} source={{ uri: post.nome_foto }} />
                                                        {animation && (
                                                            <Animated.View
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '30%',
                                                                    left: '30%',
                                                                    opacity: animation.heart,
                                                                    transform: [{ scale: animation.scale }],
                                                                }}
                                                            >
                                                                <Image
                                                                    source={require('./assets/heartWhite.png')}
                                                                    style={{ width: 120, height: 120 }}
                                                                />
                                                            </Animated.View>
                                                        )}
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={PostsStyles.textBottom}>{post.desc_foto}</Text>
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
                                                <View style={PostsStyles.bordaBottom}></View>
                                            </View>
                                        );
                                    })
                                ) : (
                                    <Text style={PostsStyles.noPostsText}>Nenhum post encontrado.</Text> // Mensagem quando não há posts
                                )
                            )}
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Posts;
