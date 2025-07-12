import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from "react-native";
import EditQuizStyles from "../styles/EditQuizStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { EarnPointsNavigationProp } from "../navigation";

interface Question {
  id: string;
  pergunta: string;
}

const EditQuiz: React.FC = () => {
  const navigation = useNavigation<EarnPointsNavigationProp>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(""); // ID da pergunta a ser excluída
  const [modalSureVisible, setModalSureVisible] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user, partnerId } = useAppContext();
  const backendUrl = "https://backendlogindl.vercel.app/api/auth";

  const fetchQuestions = async () => {
    try {
      if (!refreshing) setLoading(true);
      const response = await fetch(`${backendUrl}/questionsAll/${partnerId}`);
      const data = await response.json();

      // ⚡️ Ordena do maior para o menor ID
      const sortedData = data.sort(
        (a: Question, b: Question) => Number(b.id) - Number(a.id)
      );

      setQuestions(sortedData);
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

  const closeSureModal = () => {
    setModalSureVisible(false);
  };

  const confirmDelete = (itemId: string) => {
    setModalSureVisible(true); // Exibe o modal de confirmação
    setQuestionToDelete(itemId); // Define o item a ser excluído
  };

  const deleteItem = async () => {
    if (!questionToDelete) return;
    try {
      await fetch(`${backendUrl}/deleteQuestion/${questionToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAlertTitle("Sucesso");
      setAlertMessage("Item excluído com sucesso!");
      await fetchQuestions(); // <-- Aqui faz o refresh manual
    } catch (error) {
      setAlertTitle("Erro");
      setAlertMessage("Erro ao excluir o item.");
      console.error("Erro ao excluir o item:", error);
    } finally {
      setShowModal(false);
      setQuestionToDelete(null);
    }
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

        <TouchableOpacity
          style={EditQuizStyles.createButton}
          onPress={() => {
            navigation.navigate("CreateQuestion");
          }}
        >
          <Text style={EditQuizStyles.createButtonText}>
            Criar nova pergunta
          </Text>
        </TouchableOpacity>

        <Text style={EditQuizStyles.totalQuestions}>
          Total de perguntas: {questions.length > 0 ? questions.length : ""}
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
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("EditQuestion", {
                          questionId: question.id,
                        });
                      }}
                    >
                      <Image
                        source={require("./assets/editing.png")}
                        style={EditQuizStyles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => confirmDelete(question.id)}
                    >
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
      {modalSureVisible && (
        <Modal
          transparent={true}
          visible={modalSureVisible}
          animationType="fade"
        >
          <View style={EditQuizStyles.modalContainer}>
            <View style={EditQuizStyles.modalContent}>
              <Text style={EditQuizStyles.modalTitle}>
                Você tem certeza que deseja excluir a pergunta?
              </Text>
              <View style={EditQuizStyles.modalButtons}>
                <TouchableOpacity
                  style={EditQuizStyles.buttonCancel}
                  onPress={closeSureModal}
                >
                  <Text style={EditQuizStyles.buttonText1}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={EditQuizStyles.buttonConfirm}
                  onPress={() => {
                    deleteItem(); // Chama a função deleteItem ao clicar em "Sim"
                    closeSureModal(); // Fecha o modal
                  }}
                >
                  <Text style={EditQuizStyles.buttonText1}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default EditQuiz;
