import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import EditQuestionStyles from "../styles/EditQuestionStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LinearGradient } from "expo-linear-gradient";
import { useAppContext } from "../context/AppContext";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation";

type EditQuestionRouteProp = RouteProp<RootStackParamList, "EditQuestion">;

interface Answer {
  id: number;
  text: string;
  is_correta: boolean;
}

const EditQuestion: React.FC = () => {
  const route = useRoute<EditQuestionRouteProp>();
  const { questionId } = route.params;
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const backendUrl = "https://backendlogindl.vercel.app/api/auth";

  const { partnerId } = useAppContext();

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/questionSingle/${questionId}`
        );
        const data = await response.json();

        if (response.ok) {
          // Define o texto da pergunta
          setQuestionText(data.question.pergunta);

          // Mapeia as respostas
          const mappedAnswers: Answer[] = data.answers.map((ans: any) => ({
            id: ans.id,
            text: ans.resposta,
            is_correta: ans.is_correta,
          }));

          setAnswers(mappedAnswers);

          // Define qual índice está correto
          const correctIdx = mappedAnswers.findIndex((a) => a.is_correta);
          setCorrectIndex(correctIdx >= 0 ? correctIdx : null);
        } else {
          alert("Erro ao buscar pergunta.");
        }
      } catch (err) {
        console.error("Erro ao buscar pergunta:", err);
        alert("Erro no servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = value;
    setAnswers(newAnswers);
  };

  const handleSetCorrect = (index: number) => {
    setCorrectIndex(index);
    const newAnswers = answers.map((a, idx) => ({
      ...a,
      is_correta: idx === index,
    }));
    setAnswers(newAnswers);
  };

  const handleSaveQuestion = async () => {
    if (!questionText.trim()) {
      alert("Digite uma pergunta!");
      return;
    }

    if (answers.some((a) => !a.text.trim())) {
      alert("Preencha todas as respostas!");
      return;
    }

    if (correctIndex === null) {
      alert("Selecione qual é a resposta correta!");
      return;
    }

    const body = {
      pergunta: questionText,
      indiceCorreta: answers[correctIndex].id,
      partnerId: partnerId,
      respostas: answers.map((ans) => ({
        id: ans.id,
        texto: ans.text,
      })),
    };

    try {
      const response = await fetch(`${backendUrl}/editQuestion/${questionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Pergunta atualizada com sucesso!");
      } else {
        alert("Erro ao atualizar pergunta: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao salvar pergunta:", error);
      alert("Erro de rede ou servidor.");
    }
  };

  return (
    <View style={EditQuestionStyles.container}>
      <Header icons={[]} back />

      <LinearGradient
        colors={["#e41d69", "#fe8277"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={EditQuestionStyles.main}
      >
        {loading ? (
          <View style={EditQuestionStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        ) : (
          <>
            <Text style={EditQuestionStyles.titleScreen}>Editar Pergunta</Text>
            <ScrollView
              contentContainerStyle={EditQuestionStyles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={EditQuestionStyles.card}>
                <Text style={EditQuestionStyles.title}>Título</Text>
                <TextInput
                  style={EditQuestionStyles.inputQuestion}
                  placeholder="Título da pergunta"
                  placeholderTextColor="#aaa"
                  value={questionText}
                  onChangeText={setQuestionText}
                />

                <Text style={EditQuestionStyles.subtitle}>Respostas:</Text>

                {answers.map((answer, index) => (
                  <View
                    key={answer.id}
                    style={EditQuestionStyles.answerContainer}
                  >
                    <TextInput
                      style={EditQuestionStyles.inputAnswer}
                      placeholder={`Resposta ${index + 1}`}
                      placeholderTextColor="#aaa"
                      value={answer.text}
                      onChangeText={(text) => handleAnswerChange(index, text)}
                    />

                    <TouchableOpacity
                      style={[
                        EditQuestionStyles.radioCircle,
                        correctIndex === index &&
                          EditQuestionStyles.radioSelected,
                      ]}
                      onPress={() => handleSetCorrect(index)}
                    />
                  </View>
                ))}

                <TouchableOpacity
                  style={EditQuestionStyles.createButton}
                  onPress={handleSaveQuestion}
                >
                  <Text style={EditQuestionStyles.createButtonText}>
                    Salvar Alterações
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}
        <Footer />
      </LinearGradient>
    </View>
  );
};

export default EditQuestion;
