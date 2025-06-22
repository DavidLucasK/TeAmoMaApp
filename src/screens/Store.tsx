import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import StoreStyles from "../styles/StoreStyles";
import Header from "../components/Header";
import CustomAlert from "../components/CustomAlert";
import { StoreNavigationProp } from "../navigation";
import { useAppContext } from "../context/AppContext";
import Footer from "../components/Footer";

interface Item {
  id: string;
  title: string;
  description: string;
  points: number;
  imageUrl: string;
}

const Store: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [isRedeeming, setIsRedeeming] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [redeemingItemId, setRedeemingItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StoreNavigationProp>();
  const { user, partnerId } = useAppContext();

  const backendUrl = "https://backendlogindl.vercel.app/api/auth";

  const icons = [
    {
      icon: require("./assets/profile-user.png"),
      screen: "Profile",
    },
  ];

  useEffect(() => {
    if (!hasFetched) {
      fetchPoints();
      fetchItems();
      setHasFetched(true);
    }
  }, [hasFetched]);

  const fetchPoints = async () => {
    try {
      const response = await fetch(`${backendUrl}/points/${user}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Erro ao buscar pontos");

      const data = await response.json();
      setPoints(data.points);
    } catch (error) {
      console.error("Erro ao buscar pontos:", error);
    }
  };

  const updatePoints = async (pointsEarned: number) => {
    try {
      const response = await fetch(`${backendUrl}/update-points/${user}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pointsEarned }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao atualizar pontos:", errorData.message);
      } else {
        console.log("Pontos atualizados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição:", error);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/items/${user}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Erro ao buscar itens");

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
      } else {
        console.error("A resposta não contém um array de itens.");
      }
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEmail = async () => {
    try {
      const response = await fetch(`${backendUrl}/get-profile/${partnerId}`);
      if (!response.ok) throw new Error("Erro ao buscar perfil");
      const partnerData = await response.json();
      setEmail(partnerData.email);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const insertRedemption = async (rewardId: string, pointsRequired: number) => {
    await getEmail();
    try {
      const response = await fetch(`${backendUrl}/insert-redemption/${user}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rewardId,
          pointsRequired,
          userEmail: email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao registrar resgate:", errorData.message);
      } else {
        console.log("Resgate registrado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição:", error);
    }
  };

  const handleRedemption = async (item: Item) => {
    if (points >= item.points) {
      try {
        setRedeemingItemId(item.id);
        setIsRedeeming(true);
        await updatePoints(-item.points);
        await insertRedemption(item.id, item.points);
        setAlertTitle("Parabéns gatinha");
        setAlertMessage("Resgate feito com sucesso!");
        setShowAlert(true);
        await fetchPoints();
        await fetchItems();
      } catch (error) {
        console.error("Erro ao processar resgate:", error);
        setAlertTitle("Erro");
        setAlertMessage("Algo deu errado durante o resgate. Tente novamente.");
        setShowAlert(true);
      } finally {
        setRedeemingItemId(null);
        setIsRedeeming(false);
      }
    } else {
      setAlertTitle("Oops");
      setAlertMessage("Você não tem pontos suficientes espertinha kkk");
      setShowAlert(true);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPoints();
    await fetchItems();
    setRefreshing(false);
  };

  return (
    <View style={StoreStyles.container}>
      <Header icons={icons as any} />
      <ScrollView
        style={StoreStyles.storeSection}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={StoreStyles.pointsSection}>
          <Text style={StoreStyles.pointsTitle}>Você tem:</Text>
          <View style={StoreStyles.pointsContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#FFF" />
            ) : (
              <Text style={StoreStyles.points}>{points} LovePoints</Text>
            )}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("EarnPoints")}>
            <Text style={StoreStyles.howToEarn}>
              Clique aqui para pegar LovePoints.
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={StoreStyles.plusBtn}
            onPress={() => navigation.navigate("EditStore")}
          >
            <Text style={StoreStyles.plus}>Editar Loja do Parceiro</Text>
          </TouchableOpacity>
        </View>

        <View style={StoreStyles.bordaBottom}></View>

        {loading ? (
          <View>
            <ActivityIndicator
              style={StoreStyles.loadingItems}
              size="large"
              color="#e41d69"
            />
          </View>
        ) : Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <View key={item.id}>
              <Text style={StoreStyles.itemTitle}>{item.title}</Text>
              <View style={StoreStyles.leftSide}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={StoreStyles.itemImage}
                />
                <LinearGradient
                  colors={["transparent", "#0000002b", "#FFFFFFFF"]}
                  style={StoreStyles.borderImage}
                />
              </View>
              <View style={StoreStyles.rightSide}>
                <Text style={StoreStyles.itemDescription}>
                  {item.description}
                </Text>
                <Text style={StoreStyles.itemPoints2}>
                  LovePoints necessários:{" "}
                  <Text style={{ color: "#e41d69" }}>{item.points}</Text>
                </Text>
                <TouchableOpacity
                  style={StoreStyles.redeemButton}
                  onPress={() => handleRedemption(item)}
                  disabled={redeemingItemId === item.id}
                >
                  <Text style={StoreStyles.redeemButtonText}>
                    {redeemingItemId === item.id ? "Resgatando..." : "Resgatar"}
                  </Text>
                </TouchableOpacity>
                <LinearGradient
                  colors={["transparent", "#0000002b", "#FFFFFFFF"]}
                  style={StoreStyles.borderRedeem}
                />
              </View>
              <View style={StoreStyles.bordaBottom}></View>
            </View>
          ))
        ) : (
          <View style={StoreStyles.containerNoItems}>
            <Text style={StoreStyles.noItems}>
              Peça ao parceiro para criar novos items!
            </Text>
          </View>
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
      <Footer />
    </View>
  );
};

export default Store;
