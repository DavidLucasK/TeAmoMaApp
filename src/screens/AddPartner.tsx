import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import AddPartnerStyles from "../styles/AddPartnerStyles";
import { useNavigation } from "@react-navigation/native";
import { AddPartnerNavigationProp } from "../navigation";
import Header from "../components/Header";
import { useAppContext } from "../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../components/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const icons = [
  {
    icon: require("./assets/profile-user.png"),
    screen: "Profile",
  },
];

const AddPartner: React.FC = () => {
  const navigation = useNavigation<AddPartnerNavigationProp>();
  const backendUrl = "https://backendlogindl.vercel.app/api/auth";
  const { user, partnerId } = useAppContext();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [namePartner, setNamePartner] = useState<string>("");
  const [emailPartner, setEmailPartner] = useState<string>("");
  const [phonePartner, setPhonePartner] = useState<string>("");
  const [pointsPartner, setPointsPartner] = useState<number>(0);
  const [myName, setMyName] = useState<string>("");

  useEffect(() => {
    const loadPartnerData = async () => {
      try {
        const response = await fetch(`${backendUrl}/get-profile/${partnerId}`);
        const profileData = await response.json();

        setProfileImage(profileData.profile_image || "");
        setNamePartner(profileData.name || "");
        setEmailPartner(profileData.email || "");
        setPhonePartner(profileData.phone || "");
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
      }
    };

    const loadMyName = async () => {
      try {
        const res = await fetch(`${backendUrl}/get-profile/${user}`);
        const profileData = await res.json();
        setMyName(profileData.name || "");
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
      }
    };

    const fetchPoints = async () => {
      try {
        const response = await fetch(`${backendUrl}/points/${partnerId}`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          console.error("Erro ao buscar pontos:", response.status);
          return;
        }

        const data = await response.json();
        setPointsPartner(data.points);
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
      }
    };

    if (partnerId) {
      loadPartnerData();
      loadMyName();
      fetchPoints();
    }
  }, [partnerId, user]);

  return (
    <View style={AddPartnerStyles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Header icons={icons as any} />
        <LinearGradient
          colors={["#e41d69", "#fe8277"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={AddPartnerStyles.main}
        >
          <View style={AddPartnerStyles.main}>
            <View style={AddPartnerStyles.profileInfo}>
              <View style={AddPartnerStyles.photoContainer}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={AddPartnerStyles.profileImage}
                  />
                ) : (
                  <Image style={AddPartnerStyles.profileImage} />
                )}
              </View>

              <View style={AddPartnerStyles.textContainer}>
                <Text style={AddPartnerStyles.points}>
                  Pontos: {pointsPartner}
                </Text>
                <Text style={AddPartnerStyles.info}>Nome de Usuário</Text>
                <Text style={AddPartnerStyles.textInput}>{namePartner}</Text>
                <Text style={AddPartnerStyles.info}>Email</Text>
                <Text style={AddPartnerStyles.textInput}>{emailPartner}</Text>
                <Text style={AddPartnerStyles.info}>Telefone</Text>
                <Text style={AddPartnerStyles.textInput}>{phonePartner}</Text>
                <Text style={AddPartnerStyles.info}>Parceiro</Text>
                <Text style={AddPartnerStyles.textInput}>{myName}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default AddPartner;
