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
  TextInput,
} from "react-native";
import EditItemStoreStyles from "../styles/EditItemStoreStyles";
import CustomAlert from "../components/CustomAlert";
import Header from "../components/Header";
import { useAppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { EditItemStoreNavigationProp } from "../navigation";
import Footer from "../components/Footer";
import Shimmer from "../components/Shimmer";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation";

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

const EditItemStore: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<EditItemStoreNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, "EditItemStore">>();
  const { id, title, description, points, imageUrl } = route.params;

  const [hasFetched, setHasFetched] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDesc, setNewDesc] = useState<string>(description);
  const [newPoints, setNewPoints] = useState<number>(points);
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={EditItemStoreStyles.container}>
      <Header icons={icons as any} />
      <ScrollView showsVerticalScrollIndicator={true}>
        <TouchableOpacity
          style={EditItemStoreStyles.buttonBack}
          onPress={handleGoBack}
        >
          <Text style={EditItemStoreStyles.buttonBackText}>Voltar</Text>
        </TouchableOpacity>
        <View>
          <TextInput
            style={EditItemStoreStyles.itemTitle}
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <Image
            source={{ uri: imageUrl }}
            style={EditItemStoreStyles.itemImage}
          />
          <TextInput
            style={EditItemStoreStyles.itemDescription}
            value={newDesc}
            multiline
            onChangeText={setNewDesc}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={EditItemStoreStyles.itemPoints2}>
              Preço LovePoints:{" "}
            </Text>
            <TextInput
              style={[
                EditItemStoreStyles.itemPoints2,
                { color: "#e41d69", width: 60 },
              ]}
              value={String(newPoints)}
              keyboardType="numeric"
              onChangeText={(text) => setNewPoints(Number(text))}
            />
          </View>

          <TouchableOpacity
            onPress={() => console.log("Salvar alterações!")}
            style={EditItemStoreStyles.button}
          >
            <Text style={EditItemStoreStyles.buttonText}>
              Salvar alterações
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default EditItemStore;
