import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, ActivityIndicator, ScrollView } from 'react-native';
import { formatDistanceToNow, parseISO } from 'date-fns';
import axios from 'axios';
import { RootStackParamList, IndividualPostNavigationProp } from '../navigation';
import IndividualPostStyles from '../styles/IndividualPostStyles';
import Header from '../components/Header';
import CommentInput from '../components/CommentInput';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

type IndividualPostRouteProp = RouteProp<RootStackParamList, 'IndividualPost'>;

interface Post {
    id: number;
    desc_foto: string;
    data: string;
    is_liked: boolean;
    nome_foto: string;
    username: string;
    comments: { username: string; comment_text: string }[]; // Estrutura de comentários
}

const IndividualPost: React.FC = () => {
    const navigation = useNavigation<IndividualPostNavigationProp>();
    const route = useRoute<IndividualPostRouteProp>(); // Para acessar os parâmetros da rota
    const { postId } = route.params; // Pega o id do post vindo da rota anterior

    const [isCommenting, setIsCommenting] = useState(false); // Controla se o campo de comentário está visível
    const [commentText, setCommentText] = useState('');
    const [commentingPostId, setCommentingPostId] = useState<number | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const [pendingLike, setPendingLike] = useState<number | null>(null);
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [lastPress, setLastPress] = useState(0);
    
    const [animations, setAnimations] = useState<{ heart: Animated.Value; scale: Animated.Value }>({
        heart: new Animated.Value(0),
        scale: new Animated.Value(1),
    });

    const { user } = useAppContext();
    let userName = null

    //1 == Mazinha02
    //2 == Avix

    userName = user == '1' ? 'Mazinha02' : 'Avix';
    console.log(user);

    const backendUrl = 'https://backendlogindl.vercel.app/api/auth'; // Atualize o URL do backend conforme necessário

    // Função para buscar o post pelo ID
    const fetchPostById = async (postId: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/post/${postId}`); // Atualizado para o endpoint correto
            setPost(response.data);
            setLiked(response.data.is_liked);
        } catch (error) {
            console.error('Erro ao buscar post:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPostById(postId); // Chama a função de busca ao carregar o componente
    }, [postId]);

    // const toggleLike = (postId: number) => {
    //     if (likedPosts.includes(postId)) {
    //         // Se o post já está curtido, removê-lo da lista de likes
    //         setLikedPosts(prevLikes => prevLikes.filter(id => id !== postId));
    //         setPendingLike(null); // Agora trabalhamos com um único like pendente
    //     } else {
    //         // Se o post não está curtido, adicioná-lo à lista de likes
    //         setLikedPosts(prevLikes => [...prevLikes, postId]);
    //         setPendingLike(postId); // Define o único like pendente
    //     }
    
    //     // Atualiza o estado do post
    //     setPosts(prevPosts =>
    //         prevPosts.map(post =>
    //             post.id === postId
    //                 ? { ...post, is_liked: !post.is_liked } // Alterna o estado de curtida diretamente no post
    //                 : post
    //         )
    //     );
    // };

    const updateLike = async () => {
        console.log('updateLike chamada');
        if (pendingLike !== null) {
            try {
                console.log("Atualizando like para o post:", pendingLike);
                
                // Enviar o postId como um array com um único item
                await axios.post(`${backendUrl}/like`, { likedPostIds: [pendingLike] });
                
                console.log('Like atualizado para o post:', pendingLike);
    
                // Atualizar o estado do post após atualizar o like
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post.id === pendingLike ? { ...post, is_liked: true } : post
                    )
                );
    
                // Limpar o like pendente
                setPendingLike(null);
            } catch (error) {
                console.error('Erro ao atualizar like:', error);
            }
        }
    };
    

    useEffect(() => {
        if (pendingLike !== null) {
            updateLike(); // Agora atualizamos um único like por vez
        }
    }, [pendingLike]);

    // const animateHeart = (postId: number) => {
    //     const heartAnimation = new Animated.Value(0);
    //     const scaleAnimation = new Animated.Value(1);

    //     setAnimations((prev) => ({
    //         ...prev,
    //         [postId]: { heart: heartAnimation, scale: scaleAnimation },
    //     }));

    //     Animated.parallel([
    //         Animated.timing(heartAnimation, {
    //             toValue: 1,
    //             duration: 400,
    //             useNativeDriver: true,
    //         }),
    //         Animated.timing(scaleAnimation, {
    //             toValue: 1.1,
    //             duration: 200,
    //             useNativeDriver: true,
    //         }),
    //     ]).start(() => {
    //         Animated.timing(scaleAnimation, {
    //             toValue: 1,
    //             duration: 120,
    //             useNativeDriver: true,
    //         }).start(() => {
    //             Animated.timing(heartAnimation, {
    //                 toValue: 0,
    //                 duration: 300,
    //                 useNativeDriver: true,
    //             }).start(() => {
    //                 setAnimations((prev) => {
    //                     const newAnimations = { ...prev };
    //                     delete newAnimations[postId];
    //                     return newAnimations;
    //                 });
    //             });
    //         });
    //     });
    // };

    // const handleDoublePress = (postId: number) => {
    //     const time = new Date().getTime();
    //     if (time - lastPress < 700) {
    //         toggleLike(postId);
    //             animateHeart(postId);
    //     }
    //     setLastPress(time);
    // };

    const calculateTimeAgo = (postDate: string) => {
        const postDateParsed = parseISO(postDate);
        let timeAgo = formatDistanceToNow(postDateParsed, { addSuffix: true });
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

    const handleAddCommentPress = (postId: number) => {
        setCommentingPostId(postId);
    };

    const handleCommentChange = (text: string) => {
        setCommentText(text);
    };

    useEffect(() => {
        fetchPostById(postId);
    }, []);

    const handlePublishComment = async () => {
        if (commentText.trim() !== '' && commentingPostId !== null) {
            try {
                // Enviar dados para o endpoint de comentário
                await axios.post(`${backendUrl}/comment`, {
                    id_post: commentingPostId,
                    comment_text: commentText,
                    username: userName
                });
    
                console.log('Comentário publicado:', commentText);
                // Limpa o campo de texto após publicar
                setCommentText('');
                // Esconde o campo de comentário
                setIsCommenting(false);
                
                // Atualiza o post para incluir o novo comentário
                setPost(prevPost => {
                    if (prevPost) {
                        return {
                            ...prevPost,
                            comments: [
                                ...prevPost.comments,
                                {
                                    username: userName,
                                    comment_text: commentText
                                }
                            ]
                        };
                    }
                    return prevPost;
                });
            } catch (error) {
                console.error('Erro ao publicar comentário:', error);
            }
        }
    };
    
    {/* Tela de carregamento antes de fazer o fetch */}
    if (isLoading) {
        return (
            <View style={IndividualPostStyles.container}>
                <Header
                    leftIcon={require('./assets/store.png')}
                    middleIcon={require('./assets/posts.png')}
                    rightIcon={require('./assets/profile-user.png')}
                    onLeftIconPress={() => navigation.navigate('Store')}
                    onMiddleIconPress={() => navigation.navigate('Posts')}
                    onRightIconPress={() => navigation.navigate('Profile')}
                    isStoreScreen={false}
                />
                <ScrollView>
                    <View style={IndividualPostStyles.post}>
                        <Text style={IndividualPostStyles.user}>Carregando...</Text>
                        <Text style={IndividualPostStyles.tempo}>Algum tempo ...</Text>
                        <View style={IndividualPostStyles.imageContainer}>
                            <TouchableOpacity>
                                <ActivityIndicator style={IndividualPostStyles.loadingIcon} size="large" color="#e41d69" />
                                {/* <Animated.View
                                    style={{
                                        position: 'absolute',
                                        top: '30%',
                                        left: '30%',
                                        opacity: animations.heart,
                                        transform: [{ scale: animations.scale }],
                                    }}
                                >
                                    <Image source={require('./assets/heartWhite.png')} style={{ width: 120, height: 120 }} />
                                </Animated.View> */}
                            </TouchableOpacity>
                        </View>
                        <Text style={IndividualPostStyles.textBottom}>
                            Carregando...
                        </Text>
                        <View style={IndividualPostStyles.commentSection}>
                            <TouchableOpacity>
                                <Text style={IndividualPostStyles.addComments}>Adicione um comentário...</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={IndividualPostStyles.iconsContainer}>
                            <TouchableOpacity>
                                <Image
                                    style={IndividualPostStyles.iconsContainer}
                                    source={
                                        liked
                                            ? require('./assets/heartFilled.png')
                                            : require('./assets/heartNoFill.png')
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    {/* Tela real depois de carregar e fazer o fetch */}
    return (
        <View style={IndividualPostStyles.container}>
            <Header
                leftIcon={require('./assets/store.png')}
                middleIcon={require('./assets/posts.png')}
                rightIcon={require('./assets/profile-user.png')}
                onLeftIconPress={() => navigation.navigate('Store')}
                onMiddleIconPress={() => navigation.navigate('Posts')}
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            {post && (
                <ScrollView>
                    <View style={IndividualPostStyles.post}>
                        <Text style={IndividualPostStyles.user}>{post.username}</Text>
                        <Text style={IndividualPostStyles.tempo}>{calculateTimeAgo(post.data)}</Text>
                        <View style={IndividualPostStyles.imageContainer}>
                            <TouchableOpacity activeOpacity={0.7}>
                                <Image style={IndividualPostStyles.imagePost} source={{ uri: post.nome_foto }} />
                                {/* <Animated.View
                                    style={{
                                        position: 'absolute',
                                        top: '30%',
                                        left: '30%',
                                        opacity: animations.heart,
                                        transform: [{ scale: animations.scale }],
                                    }}
                                >
                                    <Image source={require('./assets/heartWhite.png')} style={{ width: 120, height: 120 }} />
                                </Animated.View> */}
                            </TouchableOpacity>
                        </View>
                        <Text style={IndividualPostStyles.textBottom}>
                            <Text style={IndividualPostStyles.usernameDesc} onPress={() => navigation.navigate('Profile')}>
                                {post.username}
                            </Text>{' '}
                            {post.desc_foto}
                        </Text>
                        {/* Exibindo comentários do post */}
                        {post.comments && post.comments.length > 0 ? 
                        (
                            post.comments.map((comment, index) => (
                                <View key={index} style={IndividualPostStyles.commentContainer}>
                                    <Text style={IndividualPostStyles.comments}>
                                        <Text onPress={() => navigation.navigate('Profile')} style={IndividualPostStyles.usernameComments}>
                                            {comment.username}
                                        </Text>{' '}
                                        {comment.comment_text}
                                    </Text>
                                </View>
                            ))
                        ) : null}
                        <View style={IndividualPostStyles.commentSection}>
                            {commentingPostId === post.id ? (
                            <View>
                                <CommentInput
                                    commentText={commentText}
                                    onChangeText={handleCommentChange}
                                />
                                {commentText.trim() !== '' && (
                                    <TouchableOpacity onPress={handlePublishComment}>
                                        <Text style={IndividualPostStyles.publicarbtn}>Publicar</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : (
                            <TouchableOpacity onPress={() => handleAddCommentPress(post.id)}>
                                <Text style={IndividualPostStyles.addComments}>Adicione um comentário...</Text>
                            </TouchableOpacity>
                        )}
                        </View>
                        <View style={IndividualPostStyles.iconsContainer}>
                            <TouchableOpacity>
                                <Image
                                    style={IndividualPostStyles.iconsContainer}
                                    source={
                                        liked
                                            ? require('./assets/heartFilled.png')
                                            : require('./assets/heartNoFill.png')
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default IndividualPost;
