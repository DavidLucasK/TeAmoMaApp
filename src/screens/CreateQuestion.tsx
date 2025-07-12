import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CreateQuestionStyles from "../styles/CreateQuestionStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LinearGradient } from "expo-linear-gradient";
import { useAppContext } from "../context/AppContext";

interface Answer {
  id: number;
  text: string;
}

const CreateQuestion: React.FC = () => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
    { id: 4, text: "" },
  ]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const backendUrl = "https://backendlogindl.vercel.app/api/auth";

  const { partnerId } = useAppContext();

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = value;
    setAnswers(newAnswers);
  };

  const handleSetCorrect = (index: number) => {
    setCorrectIndex(index);
  };

  const handleCreateQuestion = async () => {
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
      indiceCorreta: correctIndex,
      partnerId: partnerId,
      respostas: answers.map((ans) => ({
        id: ans.id,
        texto: ans.text,
      })),
    };

    try {
      const response = await fetch(`${backendUrl}/createQuestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Pergunta criada:", data);
        alert("Pergunta criada com sucesso!");
        // Limpa campos
        setQuestionText("");
        setAnswers([
          { id: 1, text: "" },
          { id: 2, text: "" },
          { id: 3, text: "" },
          { id: 4, text: "" },
        ]);
        setCorrectIndex(null);
      } else {
        console.error("Erro:", data);
        alert("Erro ao criar pergunta: " + data.message);
      }
    } catch (error) {
      console.error("Erro ao criar pergunta:", error);
      alert("Erro de rede ou servidor.");
    }
  };

  return (
    <View style={CreateQuestionStyles.container}>
      <Header icons={[]} back />

      <LinearGradient
        colors={["#e41d69", "#fe8277"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={CreateQuestionStyles.main}
      >
        <Text style={CreateQuestionStyles.titleScreen}>Criar Pergunta</Text>
        <ScrollView
          contentContainerStyle={CreateQuestionStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={CreateQuestionStyles.card}>
            <Text style={CreateQuestionStyles.title}>Título</Text>
            <TextInput
              style={CreateQuestionStyles.inputQuestion}
              placeholder="Título da pergunta"
              placeholderTextColor="#aaa"
              value={questionText}
              onChangeText={setQuestionText}
            />

            <Text style={CreateQuestionStyles.subtitle}>Respostas:</Text>

            {answers.map((answer, index) => (
              <View key={index} style={CreateQuestionStyles.answerContainer}>
                <TextInput
                  style={CreateQuestionStyles.inputAnswer}
                  placeholder={`Resposta ${index + 1}`}
                  placeholderTextColor="#aaa"
                  value={answer.text}
                  onChangeText={(text) => handleAnswerChange(index, text)}
                />

                <TouchableOpacity
                  style={[
                    CreateQuestionStyles.radioCircle,
                    correctIndex === index &&
                      CreateQuestionStyles.radioSelected,
                  ]}
                  onPress={() => handleSetCorrect(index)}
                />
              </View>
            ))}

            <TouchableOpacity
              style={CreateQuestionStyles.createButton}
              onPress={handleCreateQuestion}
            >
              <Text style={CreateQuestionStyles.createButtonText}>
                Criar Pergunta
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
      <Footer />
    </View>
  );
};

export default CreateQuestion;
