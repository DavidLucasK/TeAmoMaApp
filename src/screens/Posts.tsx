import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, RefreshControl, ActivityIndicator, FlatList, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import CommentInput from '../components/CommentInput';
import PostsStyles from '../styles/PostsStyles';
import { PostsNavigationProp } from '../navigation';
import axios from 'axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
interface Post {
    id: number;
    username: string;
    data: string;
    nome_foto: string;
    desc_foto: string;
    is_liked: boolean;
    comments: Comment[];
}

interface Comment {
    username: string;
    comment_text: string;
  }

const Posts: React.FC = () => {
    const navigation = useNavigation<PostsNavigationProp>();
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const [pendingLikes, setPendingLikes] = useState<number[]>([]);
    const [lastPress, setLastPress] = useState(0);
    const [animations, setAnimations] = useState<{ [key: number]: { heart: Animated.Value; scale: Animated.Value } }>({});
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    //Adicionar comentario
    const [isCommenting, setIsCommenting] = useState(false); // Controla se o campo de comentário está visível
    const [commentText, setCommentText] = useState('');
    const [commentingPostId, setCommentingPostId] = useState<number | null>(null);

    const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

    // Função para buscar os posts da API com paginação
    const fetchPosts = async (pageNum: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/posts`, {
                params: {
                    page: pageNum,
                    limit: 10,
                },
            });

            const { posts: newPosts, totalPages: newTotalPages } = response.data;
            console.log(response.data);

            setPosts(prevPosts => pageNum === 1 ? newPosts : [...prevPosts, ...newPosts]);
            setTotalPages(newTotalPages);
            setHasMore(pageNum < newTotalPages);
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateLikes = async () => {
        console.log('updateLikes chamada');
        if (pendingLikes.length > 0) {
            try {
                console.log("tem like pra fazer")
                await axios.post(`${backendUrl}/like`, { likedPostIds: pendingLikes });
                console.log('Likes atualizados:', pendingLikes);
    
                // Atualize o estado dos posts após atualizar os likes
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        pendingLikes.includes(post.id) ? { ...post, is_liked: true } : post
                    )
                );
                setPendingLikes([]); // Limpa a lista de likes pendentes
            } catch (error) {
                console.error('Erro ao atualizar likes:', error);
            }
        }
    };

    useEffect(() => {
        if (pendingLikes.length > 0) {
            updateLikes();
        }
    }, [pendingLikes]);

    useEffect(() => {
        fetchPosts(1);
        const interval = setInterval(() => {
            updateLikes(); // Atualiza likes pendentes a cada 60 segundos
        }, 60000); // 60 segundos

        return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
    }, []);

    const loadMorePosts = () => {
        if (!isLoading && hasMore) {
            fetchPosts(page + 1);
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        fetchPosts(1);
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setPage(1);
        await fetchPosts(1);
        setRefreshing(false);
    }, []);

    const toggleLike = (postId: number) => {
        if (likedPosts.includes(postId)) {
            // Se o post já está curtido, removê-lo da lista de likes
            setLikedPosts(prevLikes => prevLikes.filter(id => id !== postId));
            setPendingLikes(prevPendingLikes => prevPendingLikes.filter(id => id !== postId));
        } else {
            // Se o post não está curtido, adicioná-lo à lista de likes
            setLikedPosts(prevLikes => [...prevLikes, postId]);
            setPendingLikes(prevPendingLikes => [...prevPendingLikes, postId]);
        }
    
        // Aqui, você pode atualizar o estado do post se necessário
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, is_liked: !post.is_liked } // Alterna o estado de curtida diretamente no post
                    : post
            )
        );
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
                duration: 400,
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
        if (time - lastPress < 700) {
            toggleLike(postId);
            if (!likedPosts.includes(postId)) {
                animateHeart(postId);
            }
        }
        setLastPress(time);
    };

    const calculateTimeAgo = (postDate: string) => {
        const postDateParsed = parseISO(postDate);
        const adjustedPostDate = postDateParsed;
        let timeAgo = formatDistanceToNow(adjustedPostDate, { addSuffix: true });

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
    
      // Função para monitorar mudanças no campo de texto
      const handleCommentChange = (text: string) => {
        setCommentText(text);
      };
    
      // Função para publicar o comentário
      const handlePublishComment = async () => {
        if (commentText.trim() !== '' && commentingPostId !== null) {
            try {
                // Enviar dados para o endpoint de comentário
                await axios.post(`${backendUrl}/comment`, {
                    id_post: commentingPostId,
                    comment_text: commentText,
                    username: 'Avix'
                });
                
                console.log('Comentário publicado:', commentText);
                setCommentText(''); // Limpa o campo de texto após publicar
                setIsCommenting(false); // Esconde o campo de comentário
                await fetchPosts(1);
            } catch (error) {
                console.error('Erro ao publicar comentário:', error);
            }
        }
    };

    const handleOutsidePress = () => {
        if (commentingPostId !== null) {
            setCommentingPostId(null);
            setCommentText('');
            Keyboard.dismiss();
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        const animation = animations[item.id];
        return (
            <View style={PostsStyles.post}>
                <Text style={PostsStyles.user} onPress={() => navigation.navigate('Profile')}>{item.username}</Text>
                <Text style={PostsStyles.tempo}>{calculateTimeAgo(item.data)}</Text>
                <View style={PostsStyles.imageContainer}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => handleDoublePress(item.id)}>
                        <Image style={PostsStyles.imagePost} source={{ uri: item.nome_foto }} />
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
                <Text style={PostsStyles.textBottom}><Text style={PostsStyles.usernameDesc} onPress={() => navigation.navigate('Profile')}>{item.username}</Text> {item.desc_foto}</Text>
                {/* Seção de comentários */}
                {item.comments && item.comments.length > 0 ? (
                    item.comments.map((comment, index) => (
                        <View key={index} style={PostsStyles.commentContainer}>
                            <Text style={PostsStyles.comments}>
                                <Text onPress={() => navigation.navigate('Profile')} style={PostsStyles.usernameComments}>{comment.username}</Text> {comment.comment_text}
                            </Text>
                        </View>
                    ))
                ) : (
                    null
                )}

                {/* Adicionar novo comentário */}
                <View>
                    {commentingPostId === item.id ? (
                        <View>
                            <CommentInput
                                commentText={commentText}
                                onChangeText={handleCommentChange}
                            />
                            {commentText.trim() !== '' && (
                                <TouchableOpacity onPress={handlePublishComment}>
                                    <Text style={PostsStyles.publicarbtn}>Publicar</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ) : (
                        <TouchableOpacity onPress={() => handleAddCommentPress(item.id)}>
                            <Text style={PostsStyles.addComments}>Adicione um comentário...</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={PostsStyles.iconsContainer}>
                    <TouchableOpacity onPress={() => toggleLike(item.id)}>
                        <Image
                            style={PostsStyles.iconsContainer}
                            source={
                                likedPosts.includes(item.id) || item.is_liked
                                    ? require('./assets/heartFilled.png')
                                    : require('./assets/heartNoFill.png')
                            }
                        />
                    </TouchableOpacity>
                </View>
                <View style={PostsStyles.bordaBottom}></View>
            </View>
        );
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
                <View style={PostsStyles.postsContainer}>
                    <TouchableOpacity style={PostsStyles.plusBtn} onPress={() => navigation.navigate('CreatePost')}>
                        <Image style={PostsStyles.plus} source={require('./assets/plus.png')} />
                    </TouchableOpacity>
                    <FlatList
                        data={posts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        onEndReached={loadMorePosts}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={isLoading ? <ActivityIndicator style={PostsStyles.loadingIcon} size="large" color="#e41d69" /> : null}
                    />
                </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Posts;