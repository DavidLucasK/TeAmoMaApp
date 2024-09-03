import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import PostsStyles from '../styles/PostsStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { PostsNavigationProp } from '../navigation';
import Header from '../components/Header';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const Posts: React.FC = () => {
    const navigation = useNavigation<PostsNavigationProp>();
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const [lastPress, setLastPress] = useState(0);
    const [animations, setAnimations] = useState<{ [key: number]: { heart: Animated.Value; scale: Animated.Value } }>({});

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
                toValue: 1.1, // Aumenta a escala
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            Animated.timing(scaleAnimation, {
                toValue: 1, // Retorna à escala original
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
                        delete newAnimations[postId]; // Remove a animação após o uso
                        return newAnimations;
                    });
                });
            });
        });
    };

    const handleDoublePress = (postId: number) => {
        const time = new Date().getTime();
        if (time - lastPress < 300) {
            toggleLike(postId); // Chama toggleLike sempre

            if (!likedPosts.includes(postId)) {
                animateHeart(postId); // Passa o postId para a animação
            }
        }
        setLastPress(time);
    };

    const posts = [
        { id: 1, user: 'Mazinha02', tempo: '12 horas', imageSource: require('./assets/teste.png'), text: 'Oi amor te amo muito, tá?' },
        { id: 2, user: 'Mazinha02', tempo: '15 horas', imageSource: require('./assets/teamo2.png'), text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cum odit unde veritatis omnis optio fugit a. Corporis quia illum aspernatur omnis, distinctio assumenda sunt praesentium commodi. Corporis, eveniet quaerat!' },
        { id: 3, user: 'Mazinha02', tempo: '20 horas', imageSource: require('./assets/sobremesa.png'), text: 'Texto post 2' },
        { id: 4, user: 'Mazinha02', tempo: '23 horas', imageSource: require('./assets/cinema.png'), text: 'Texto post 3' },
        { id: 5, user: 'Mazinha02', tempo: '1 dia', imageSource: require('./assets/teste.png'), text: 'Texto post 4' },
    ];

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
                        <View style={PostsStyles.postsContainer} >
                            <TouchableOpacity style={PostsStyles.plusBtn} onPress={() => navigation.navigate('CreatePost')}>
                                <Image style={PostsStyles.plus} source={require('./assets/plus.png')} />
                            </TouchableOpacity>
                            {posts.map((post) => {
                                const animation = animations[post.id];
                                return (
                                    <View key={post.id} style={PostsStyles.post}>
                                        <Text style={PostsStyles.user}>{post.user}</Text>
                                        <Text style={PostsStyles.tempo}>Há {post.tempo}</Text>
                                        <View style={PostsStyles.imageContainer}>
                                            <TouchableOpacity onPress={() => handleDoublePress(post.id)}>
                                                <Image style={PostsStyles.imagePost} source={post.imageSource} />
                                                {animation && (
                                                    <Animated.View
                                                        style={{
                                                            position: 'absolute',
                                                            top: '30%', // Ajuste a posição conforme necessário
                                                            left: '30%',
                                                            opacity: animation.heart,
                                                            transform: [{ scale: animation.scale }],
                                                        }}
                                                    >
                                                        <Image
                                                            source={require('./assets/heartWhite.png')}
                                                            style={{ width: 120, height: 120 }} // Ajuste o tamanho conforme necessário
                                                        />
                                                    </Animated.View>
                                                )}
                                            </TouchableOpacity>
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
                                        <View style={PostsStyles.bordaBottom}></View>
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Posts;