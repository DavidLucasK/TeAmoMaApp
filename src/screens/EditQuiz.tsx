import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import EditQuizStyles from "../styles/EditQuizStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";

interface Question {
  id: string;
  pergunta: string;
}

const EditQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { partnerId } = useAppContext();
  const backendUrl = "https://backendlogindl.vercel.app/api/auth";

  const fetchQuestions = async () => {
    try {
      if (!refreshing) setLoading(true);
      const response = await fetch(`${backendUrl}/questionsAll/${partnerId}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchQuestions();
  };

  return (
    <View style={EditQuizStyles.container}>
      <Header icons={[]} back={true} />
      <LinearGradient
        colors={["#e41d69", "#fe8277"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={EditQuizStyles.main}
      >
        <Text style={EditQuizStyles.title}>Editar Perguntas</Text>

        <TouchableOpacity style={EditQuizStyles.createButton}>
          <Text style={EditQuizStyles.createButtonText}>
            Criar nova pergunta
          </Text>
        </TouchableOpacity>

        <Text style={EditQuizStyles.totalQuestions}>
          Total de perguntas: {questions.length}
        </Text>

        <ScrollView
          contentContainerStyle={EditQuizStyles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={true}
        >
          {loading && !refreshing ? (
            <ActivityIndicator size="large" color="#FFF" />
          ) : (
            <View style={EditQuizStyles.questionsContainer}>
              {questions.map((question) => (
                <View key={question.id} style={EditQuizStyles.questionCard}>
                  <View style={EditQuizStyles.questionActions}>
                    <TouchableOpacity>
                      <Image
                        source={require("./assets/editing.png")}
                        style={EditQuizStyles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        source={require("./assets/trash.png")}
                        style={EditQuizStyles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={EditQuizStyles.questionText}>
                    {question.pergunta}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        <Footer />
      </LinearGradient>
    </View>
  );
};

export default EditQuiz;
