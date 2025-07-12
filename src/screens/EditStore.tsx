import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import EditStoreStyles from "../styles/EditStoreStyles";
import CustomAlert from "../components/CustomAlert";
import Header from "../components/Header";
import { useAppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { EditStoreNavigationProp } from "../navigation";
import Footer from "../components/Footer";
import Shimmer from "../components/Shimmer";
interface Item {
  id: string;
  title: string;
  description: string;
  points: number;
  imageUrl: string;
}

const icons = [
  {
    icon: require("./assets/profile-user.png"),
    screen: "Profile",
  },
];

const EditStore: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<EditStoreNavigationProp>();

  const [hasFetched, setHasFetched] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para controlar o modal
  const [itemToDelete, setItemToDelete] = useState<string | null>(null); // ID do item a ser excluído
  const { storeItems, setStoreItems, storeItemsFetched, setStoreItemsFetched } =
    useAppContext();

  const [modalSureVisible, setModalSureVisible] = useState<boolean>(false);

  const backendUrl = "https://backendlogindl.vercel.app/api/auth";
  const { user, partnerId } = useAppContext();

  useEffect(() => {
    if (storeItemsFetched && storeItems.length > 0) {
      setItems(storeItems); // Usa o cache do contexto
      setLoading(false);
    } else {
      fetchItems();
    }
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/items/${partnerId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        const formattedItems = data.map((item) => ({
          id: item.id,
          title: item.name,
          description: item.description,
          points: item.points_required,
          imageUrl: item.image_url,
        }));
        setItems(formattedItems);
        setStoreItems(formattedItems); // Atualiza o contexto
        setStoreItemsFetched(true); // Marca como já buscado
      }
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para fechar o modal
  const closeSureModal = () => {
    setModalSureVisible(false);
  };

  const confirmDelete = (itemId: string) => {
    setModalSureVisible(true); // Exibe o modal de confirmação
    setItemToDelete(itemId); // Define o item a ser excluído
  };

  const deleteItem = async () => {
    if (!itemToDelete) return;
    try {
      await fetch(`${backendUrl}/delete_item/${itemToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAlertTitle("Sucesso");
      setAlertMessage("Item excluído com sucesso!");
      await fetchItems(); // <-- Aqui faz o refresh manual
    } catch (error) {
      setAlertTitle("Erro");
      setAlertMessage("Erro ao excluir o item.");
      console.error("Erro ao excluir o item:", error);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  };

  return (
    <View style={EditStoreStyles.container}>
      <Header icons={icons as any} />
      <TouchableOpacity
        style={EditStoreStyles.plusBtn}
        onPress={() => navigation.navigate("CreateItem")}
      >
        <Text style={EditStoreStyles.plus}>Criar novo item</Text>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={EditStoreStyles.bordaBottom}></View>
        {loading ? (
          <View>
            <View style={EditStoreStyles.iconsContainer}>
              <TouchableOpacity>
                <Image
                  style={EditStoreStyles.iconTrash}
                  source={require("./assets/editing.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={EditStoreStyles.iconTrash}
                  source={require("./assets/trash.png")}
                />
              </TouchableOpacity>
            </View>
            <Shimmer style={EditStoreStyles.textSkeleton} />
            <View>
              <Shimmer style={EditStoreStyles.imagePlaceholder} />
            </View>
          </View>
        ) : Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <View key={item.id}>
              <View style={EditStoreStyles.iconsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditItemStore", {
                      id: item.id,
                      title: item.title,
                      description: item.description,
                      points: item.points,
                      imageUrl: item.imageUrl,
                    })
                  }
                >
                  <Image
                    style={EditStoreStyles.iconTrash}
                    source={require("./assets/editing.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <Image
                    style={EditStoreStyles.iconTrash}
                    source={require("./assets/trash.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={EditStoreStyles.itemTitle}>{item.title}</Text>
              <View>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={EditStoreStyles.itemImage}
                />
              </View>
              <View>
                <Text style={EditStoreStyles.itemDescription}>
                  {item.description}
                </Text>
                <Text style={EditStoreStyles.itemPoints2}>
                  Preço LovePoints:{" "}
                  <Text style={{ color: "#e41d69" }}>{item.points}</Text>
                </Text>
              </View>
              <View style={EditStoreStyles.bordaBottom}></View>
            </View>
          ))
        ) : (
          <Text style={EditStoreStyles.noItems}>Nenhum item disponível.</Text>
        )}
      </ScrollView>
      {showAlert && (
        <CustomAlert
          title={alertTitle}
          message={alertMessage}
          visible={true}
          onClose={() => setShowAlert(false)}
        />
      )}
      {modalSureVisible && (
        <Modal
          transparent={true}
          visible={modalSureVisible}
          animationType="fade"
        >
          <View style={EditStoreStyles.modalContainer}>
            <View style={EditStoreStyles.modalContent}>
              <Text style={EditStoreStyles.modalTitle}>
                Você tem certeza que deseja excluir o item?
              </Text>
              <View style={EditStoreStyles.modalButtons}>
                <TouchableOpacity
                  style={EditStoreStyles.buttonCancel}
                  onPress={closeSureModal}
                >
                  <Text style={EditStoreStyles.buttonText1}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={EditStoreStyles.buttonConfirm}
                  onPress={() => {
                    deleteItem(); // Chama a função deleteItem ao clicar em "Sim"
                    closeSureModal(); // Fecha o modal
                  }}
                >
                  <Text style={EditStoreStyles.buttonText1}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <Footer />
    </View>
  );
};

export default EditStore;
