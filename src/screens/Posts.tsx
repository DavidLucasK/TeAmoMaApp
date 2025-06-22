import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import CommentInput from "../components/CommentInput";
import PostsStyles from "../styles/PostsStyles";
import { PostsNavigationProp } from "../navigation";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useAppContext } from "../context/AppContext";
import Footer from "../components/Footer";

interface Post {
  id: number;
  username: string;
  data: string;
  nome_foto: string;
  desc_foto: string;
  is_liked: boolean;
  comment: string;
  comment_text: string;
  index: number;
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
  const [animations, setAnimations] = useState<{
    [key: number]: { heart: Animated.Value; scale: Animated.Value };
  }>({});
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);

  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentingPostId, setCommentingPostId] = useState<number | null>(null);
  const { user, partnerId } = useAppContext();

  const icons = [
    {
      icon: require("./assets/profile-user.png"),
      screen: "Profile",
    },
  ];

  const backendUrl = "https://backendlogindl.vercel.app/api/auth";

  const fetchPosts = async (pageNum: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/posts/${user}/${partnerId}?page=${pageNum}&limit=10`
      );
      if (!response.ok) throw new Error("Erro na requisição de posts");

      const data = await response.json();
      const { posts: newPosts, totalPages: newTotalPages } = data;

      setPosts((prevPosts) =>
        pageNum === 1 ? newPosts : [...prevPosts, ...newPosts]
      );
      setTotalPages(newTotalPages);
      setHasMore(pageNum < newTotalPages);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLikes = async () => {
    if (pendingLikes.length > 0) {
      try {
        await fetch(`${backendUrl}/like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ likedPostIds: pendingLikes }),
        });

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            pendingLikes.includes(post.id) ? { ...post, is_liked: true } : post
          )
        );
        setPendingLikes([]);
      } catch (error) {
        console.error("Erro ao atualizar likes:", error);
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
    const interval = setInterval(updateLikes, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadMorePosts = () => {
    if (!isLoading && hasMore) {
      fetchPosts(page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await fetchPosts(1);
    setRefreshing(false);
  }, []);

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts((prevLikes) => prevLikes.filter((id) => id !== postId));
      setPendingLikes((prevPendingLikes) =>
        prevPendingLikes.filter((id) => id !== postId)
      );
    } else {
      setLikedPosts((prevLikes) => [...prevLikes, postId]);
      setPendingLikes((prevPendingLikes) => [...prevPendingLikes, postId]);
    }

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, is_liked: !post.is_liked } : post
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
      if (!likedPosts.includes(postId)) animateHeart(postId);
    }
    setLastPress(time);
  };

  const calculateTimeAgo = (postDate: string) => {
    const postDateParsed = parseISO(postDate);
    let timeAgo = formatDistanceToNow(postDateParsed, { addSuffix: true });

    timeAgo = timeAgo
      .replace("less than a", "menos de um")
      .replace("minutes", "minutos")
      .replace("minute", "minuto")
      .replace("hours", "horas")
      .replace("hour", "hora")
      .replace("days", "dias")
      .replace("day", "dia")
      .replace("ago", "atrás")
      .replace("in ", "")
      .replace("about ", "");

    return timeAgo;
  };

  const handleAddCommentPress = (postId: number) => {
    setCommentingPostId(postId);
  };

  const handleCommentChange = (text: string) => {
    setCommentText(text);
  };

  const handlePublishComment = async () => {
    if (commentText.trim() !== "" && commentingPostId !== null) {
      try {
        await fetch(`${backendUrl}/comment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_post: commentingPostId,
            comment_text: commentText,
            username: "Avix",
          }),
        });

        console.log("Comentário publicado:", commentText);
        setCommentText("");
        setIsCommenting(false);
        await fetchPosts(1);
      } catch (error) {
        console.error("Erro ao publicar comentário:", error);
      }
    }
  };

  const renderItem = ({ item }: { item: Post }) => {
    const animation = animations[item.id];
    return (
      <View style={PostsStyles.post}>
        <Text
          style={PostsStyles.user}
          onPress={() => navigation.navigate("Profile")}
        >
          {item.username}
        </Text>
        <Text style={PostsStyles.tempo}>{calculateTimeAgo(item.data)}</Text>
        <View style={PostsStyles.imageContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleDoublePress(item.id)}
          >
            <Image
              style={PostsStyles.imagePost}
              source={{ uri: item.nome_foto }}
            />
            {animation && (
              <Animated.View
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "30%",
                  opacity: animation.heart,
                  transform: [{ scale: animation.scale }],
                }}
              >
                <Image
                  source={require("./assets/heartWhite.png")}
                  style={{ width: 120, height: 120 }}
                />
              </Animated.View>
            )}
          </TouchableOpacity>
        </View>
        <View style={PostsStyles.iconsContainer}>
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <Image
              style={PostsStyles.heartIcon}
              source={
                likedPosts.includes(item.id) || item.is_liked
                  ? require("./assets/heartFilled.png")
                  : require("./assets/heartNoFill.png")
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("IndividualPost", { postId: item.id })
            }
          >
            <Image
              source={require("./assets/comment.png")}
              style={PostsStyles.commentIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={PostsStyles.textBottom}>
          <Text
            style={PostsStyles.usernameDesc}
            onPress={() => navigation.navigate("Profile")}
          >
            {item.username}
          </Text>{" "}
          {item.desc_foto}
        </Text>

        {item.comments && item.comments.length > 0 ? (
          item.comments.length <= 2 ? (
            item.comments.map((comment, index) => (
              <View key={index} style={PostsStyles.commentContainer}>
                <Text style={PostsStyles.comments}>
                  <Text
                    onPress={() => navigation.navigate("Profile")}
                    style={PostsStyles.usernameComments}
                  >
                    {comment.username}
                  </Text>{" "}
                  {comment.comment_text}
                </Text>
              </View>
            ))
          ) : (
            <>
              {item.comments.slice(0, 2).map((comment, index) => (
                <View key={index} style={PostsStyles.commentContainer}>
                  <Text style={PostsStyles.comments}>
                    <Text
                      onPress={() => navigation.navigate("Profile")}
                      style={PostsStyles.usernameComments}
                    >
                      {comment.username}
                    </Text>{" "}
                    {comment.comment_text}
                  </Text>
                </View>
              ))}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("IndividualPost", { postId: item.id })
                }
              >
                <Text style={PostsStyles.seeAllComments}>
                  Ver todos {item.comments.length} os comentários
                </Text>
              </TouchableOpacity>
            </>
          )
        ) : null}

        <View>
          {commentingPostId === item.id ? (
            <View>
              <CommentInput
                commentText={commentText}
                onChangeText={handleCommentChange}
              />
              {commentText.trim() !== "" && (
                <TouchableOpacity onPress={handlePublishComment}>
                  <Text style={PostsStyles.publicarbtn}>Publicar</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleAddCommentPress(item.id)}>
              <Text style={PostsStyles.addComments}>
                Adicione um comentário...
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={PostsStyles.bordaBottom}></View>
      </View>
    );
  };

  return (
    <View style={PostsStyles.container}>
      <Header icons={icons as any} />
      <LinearGradient
        colors={["#e41d69", "#fe8277"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={PostsStyles.main}
      >
        <View style={PostsStyles.main}>
          <View style={PostsStyles.postsContainer}>
            <TouchableOpacity
              style={PostsStyles.plusBtn}
              onPress={() => navigation.navigate("CreatePost")}
            >
              <Image
                style={PostsStyles.plus}
                source={require("./assets/plus.png")}
              />
            </TouchableOpacity>
            <FlatList
              data={posts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              onEndReached={loadMorePosts}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isLoading ? (
                  <ActivityIndicator
                    style={PostsStyles.loadingIcon}
                    size="large"
                    color="#e41d69"
                  />
                ) : null
              }
            />
          </View>
        </View>
      </LinearGradient>
      <View style={PostsStyles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default Posts;
