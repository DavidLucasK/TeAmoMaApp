import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import ProfileStyles from "../styles/ProfileStyles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProp } from "../navigation";
import Header from "../components/Header";
import * as ImagePicker from "expo-image-picker";
import { useAppContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";

const icons = [
  {
    icon: require("./assets/profile-user.png"),
    screen: "Profile",
  },
];

const icons2 = [
  {
    icon: require("./assets/partner-user.png"),
    screen: "AddPartner",
  },
];

const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [namePartner, setNamePartner] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const { user, setPartnerId } = useAppContext();
  const backendUrl = "https://backendlogindl.vercel.app/api/auth";

  useEffect(() => {
    loadProfileData();
    loadPartnerData();
    fetchPoints();
  }, []);

  const loadProfileData = async () => {
    try {
      const response = await fetch(`${backendUrl}/get-profile/${user}`);
      const profileData = await response.json();

      setProfileImage(profileData.profile_image || "");
      setName(profileData.name || "");
      setEmail(profileData.email || "");
      setPhone(profileData.phone || "");
      setPartnerId(profileData.partner || "");

      const partnerIdString = profileData.partner
        ? profileData.partner.toString()
        : "";
      await AsyncStorage.setItem("partnerId", partnerIdString);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
    }
  };

  const loadPartnerData = async () => {
    try {
      const storedPartnerId = await AsyncStorage.getItem("partnerId");
      if (storedPartnerId) {
        const response = await fetch(
          `${backendUrl}/get-profile/${storedPartnerId}`
        );
        const partnerData = await response.json();
        setNamePartner(partnerData.name || "");
      }
    } catch (error) {
      console.error("Erro ao carregar perfil do parceiro:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do parceiro.");
    }
  };

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

  const showImageOptions = () => setModalVisible(true);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão Negada",
        "Você precisa permitir o acesso à galeria!"
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão Negada",
        "Você precisa permitir o acesso à câmera!"
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setProfileImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return "";

    const fileName = selectedImage.split("/").pop() || "profile_pic";
    const formData = new FormData();
    formData.append("photo", {
      uri: selectedImage,
      type: "image/jpeg",
      name: fileName,
    } as any);

    try {
      const response = await fetch(`${backendUrl}/upload_imagepic`, {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });

      const data = await response.json();
      return data.fileUrl || "";
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      return "";
    }
  };

  const handleModalClose = () => setModalVisible(false);

  const handleOptionSelect = (option: "camera" | "gallery") => {
    handleModalClose();
    option === "camera" ? takePhoto() : pickImage();
  };

  const updateProfile = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setUploading(true);
    const imagePath = selectedImage ? await uploadImage() : profileImage;

    try {
      await fetch(`${backendUrl}/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          name,
          email,
          phone,
          profileImage: imagePath || "",
        }),
      });

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      setProfileImage(imagePath);
      setSelectedImage(null);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", "Não foi possível atualizar o perfil no momento.");
    }

    setUploading(false);
  };

  return (
    <KeyboardAvoidingView
      style={ProfileStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        {namePartner ? (
          <Header icons={icons2 as any} />
        ) : (
          <Header icons={icons as any} />
        )}

        <LinearGradient
          colors={["#e41d69", "#fe8277"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={ProfileStyles.main}
        >
          <View style={ProfileStyles.main}>
            <View style={ProfileStyles.profileInfo}>
              <View style={ProfileStyles.photoContainer}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={ProfileStyles.profileImage}
                  />
                ) : (
                  <Image style={ProfileStyles.profileImage} />
                )}
                <TouchableOpacity onPress={showImageOptions}>
                  <Text style={ProfileStyles.changePhotoButton}>
                    Mudar Foto
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={ProfileStyles.textContainer}>
                <Text style={ProfileStyles.points}>Pontos: {points}</Text>
                <Text style={ProfileStyles.info}>Nome de Usuário</Text>
                <TextInput
                  style={ProfileStyles.textInput}
                  placeholder="Nome"
                  value={name}
                  onChangeText={setName}
                />
                <Text style={ProfileStyles.info}>Email</Text>
                <TextInput
                  style={ProfileStyles.textInput}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <Text style={ProfileStyles.info}>Telefone</Text>
                <TextInput
                  style={ProfileStyles.textInput}
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
                <Text style={ProfileStyles.info}>Parceiro</Text>
                <Text style={ProfileStyles.textInput}>{namePartner}</Text>
                <TouchableOpacity
                  onPress={updateProfile}
                  style={ProfileStyles.updateButton}
                  disabled={uploading}
                >
                  <Text style={ProfileStyles.updateButtonText}>
                    {uploading ? "Atualizando..." : "Atualizar Perfil"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Login" }],
                    });
                  }}
                  style={ProfileStyles.logoutButton}
                >
                  <Text style={ProfileStyles.logoutButtonText}>Deslogar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={handleModalClose}
        >
          <View style={ProfileStyles.modalContainer}>
            <View style={ProfileStyles.modalContent}>
              <Text
                style={ProfileStyles.modalText}
                onPress={() => handleOptionSelect("camera")}
              >
                Tirar Foto
              </Text>
              <Text
                style={ProfileStyles.modalText}
                onPress={() => handleOptionSelect("gallery")}
              >
                Galeria
              </Text>
              <TouchableOpacity onPress={handleModalClose}>
                <Text style={ProfileStyles.cancelBtn}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
};

export default Profile;
