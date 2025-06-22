import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import AddPartnerStyles from "../styles/AddPartnerStyles";
import { useNavigation } from "@react-navigation/native";
import { AddPartnerNavigationProp } from "../navigation";
import Header from "../components/Header";
import { useAppContext } from "../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";

const icons = [
  {
    icon: require("./assets/profile-user.png"),
    screen: "Profile",
  },
];

const AddPartner: React.FC = () => {
  const navigation = useNavigation<AddPartnerNavigationProp>();
  const backendUrl = "https://backendlogindl.vercel.app/api/auth";
  const { partnerId } = useAppContext();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [namePartner, setNamePartner] = useState<string>("");
  const [emailPartner, setEmailPartner] = useState<string>("");
  const [phonePartner, setPhonePartner] = useState<string>("");
  const [pointsPartner, setPointsPartner] = useState<number>(0);

  useEffect(() => {
    const loadPartnerData = async () => {
      try {
        const response = await fetch(`${backendUrl}/get-profile/${partnerId}`);
        if (!response.ok) {
          console.error("Erro ao buscar perfil do parceiro:", response.status);
          return;
        }
        const partnerData = await response.json();
        setProfileImage(partnerData.profile_image || "");
        setNamePartner(partnerData.name || "");
        setEmailPartner(partnerData.email || "");
        setPhonePartner(partnerData.phone || "");
      } catch (error) {
        console.error("Erro ao carregar perfil do parceiro:", error);
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
      fetchPoints();
    }
  }, [partnerId]);

  return (
    <View style={AddPartnerStyles.container}>
      <Header icons={icons as any} />
      {partnerId ? (
        <LinearGradient
          colors={["#e41d69", "#fe8277"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={AddPartnerStyles.main}
        >
          <Text style={AddPartnerStyles.title}>Perfil do Parceiro</Text>
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
              </View>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <Text>NÃO HÁ DADOS</Text>
      )}
    </View>
  );
};

export default AddPartner;
