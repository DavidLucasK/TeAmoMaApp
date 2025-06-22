import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  RootStackParamList,
  IndividualPostNavigationProp,
} from "../navigation";
import IndividualPostStyles from "../styles/IndividualPostStyles";
import Header from "../components/Header";
import CommentInput from "../components/CommentInput";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";

type IndividualPostRouteProp = RouteProp<RootStackParamList, "IndividualPost">;

const icons = [
  {
    icon: require("./assets/profile-user.png"),
    screen: "Profile",
  },
];

interface Post {
  id: number;
  desc_foto: string;
  data: string;
  is_liked: boolean;
  nome_foto: string;
  username: string;
  comments: { username: string; comment_text: string }[];
}

const IndividualPost: React.FC = () => {
  const navigation = useNavigation<IndividualPostNavigationProp>();
  const route = useRoute<IndividualPostRouteProp>();
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentingPostId, setCommentingPostId] = useState<number | null>(null);
  const { user } = useAppContext();

  const backendUrl = "https://backendlogindl.vercel.app/api/auth";

  let userName = user === "1" ? "Mazinha02" : "Avix";

  const fetchPostById = async (postId: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backendUrl}/post/${postId}`);
      const data = await res.json();
      setPost(data);
      setLiked(data.is_liked);
    } catch (error) {
      console.error("Erro ao buscar post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostById(postId);
  }, [postId]);

  const handlePublishComment = async () => {
    if (commentText.trim() !== "" && commentingPostId !== null) {
      try {
        await fetch(`${backendUrl}/comment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_post: commentingPostId,
            comment_text: commentText,
            username: userName,
          }),
        });

        console.log("Comentário publicado:", commentText);
        setCommentText("");
        setCommentingPostId(null);

        setPost((prevPost) => {
          if (prevPost) {
            return {
              ...prevPost,
              comments: [
                ...prevPost.comments,
                { username: userName, comment_text: commentText },
              ],
            };
          }
          return prevPost;
        });
      } catch (error) {
        console.error("Erro ao publicar comentário:", error);
      }
    }
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

  if (isLoading) {
    return (
      <View style={IndividualPostStyles.container}>
        <Header icons={icons as any} />
        <ScrollView>
          <View style={IndividualPostStyles.post}>
            <Text style={IndividualPostStyles.user}>Carregando...</Text>
            <ActivityIndicator
              style={IndividualPostStyles.loadingIcon}
              size="large"
              color="#e41d69"
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={IndividualPostStyles.container}>
      <Header icons={icons as any} />
      {post && (
        <ScrollView>
          <View style={IndividualPostStyles.post}>
            <Text style={IndividualPostStyles.user}>{post.username}</Text>
            <Text style={IndividualPostStyles.tempo}>
              {calculateTimeAgo(post.data)}
            </Text>
            <View style={IndividualPostStyles.imageContainer}>
              <Image
                style={IndividualPostStyles.imagePost}
                source={{ uri: post.nome_foto }}
              />
            </View>
            <Text style={IndividualPostStyles.textBottom}>
              <Text
                style={IndividualPostStyles.usernameDesc}
                onPress={() => navigation.navigate("Profile")}
              >
                {post.username}
              </Text>{" "}
              {post.desc_foto}
            </Text>

            {post.comments &&
              post.comments.length > 0 &&
              post.comments.map((comment, index) => (
                <View key={index} style={IndividualPostStyles.commentContainer}>
                  <Text style={IndividualPostStyles.comments}>
                    <Text
                      onPress={() => navigation.navigate("Profile")}
                      style={IndividualPostStyles.usernameComments}
                    >
                      {comment.username}
                    </Text>{" "}
                    {comment.comment_text}
                  </Text>
                </View>
              ))}

            <View style={IndividualPostStyles.commentSection}>
              {commentingPostId === post.id ? (
                <View>
                  <CommentInput
                    commentText={commentText}
                    onChangeText={setCommentText}
                  />
                  {commentText.trim() !== "" && (
                    <TouchableOpacity onPress={handlePublishComment}>
                      <Text style={IndividualPostStyles.publicarbtn}>
                        Publicar
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => handleAddCommentPress(post.id)}
                >
                  <Text style={IndividualPostStyles.addComments}>
                    Adicione um comentário...
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={IndividualPostStyles.iconsContainer}>
              <TouchableOpacity>
                <Image
                  style={IndividualPostStyles.iconsContainer}
                  source={
                    liked
                      ? require("./assets/heartFilled.png")
                      : require("./assets/heartNoFill.png")
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
