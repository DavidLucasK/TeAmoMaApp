import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import HomeStyles from "../styles/HomeStyles"; // Importando os estilos do Home
import { LinearGradient } from "expo-linear-gradient"; // Importando LinearGradient
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importando AsyncStorage
import { useNavigation } from "@react-navigation/native"; // Importando useNavigation
import { HomeNavigationProp } from "../navigation"; // Importando o tipo de navegação
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";

const icons = [
  {
    icon: require("./assets/profile-user.png"),
    screen: "Profile",
  },
];

const Home: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>(); // Usando o tipo de navegação para HomeScreen
  const [typedText, setTypedText] = useState<string>("");
  const [texts, setTexts] = useState<string[]>([]);
  const [hasViappd, setHasViappd] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { user, partnerId } = useAppContext();

  const backendUrl = "https://backendlogindl.vercel.app/api/auth";

  useEffect(() => {
    async function getTexts() {
      if (!user) {
        return;
      }

      try {
        const res = await fetch(`${backendUrl}/get-texts/${user}`);
        if (!res.ok) {
          console.error("Erro ao buscar texto:", res.status);
          return;
        }

        const data = await res.json();

        if (data.texto) {
          const textosArray = [
            data.texto.texto1,
            data.texto.texto2,
            data.texto.texto3,
          ];
          setTexts(textosArray);
          console.log("Textos recebidos:", textosArray);
        }
      } catch (error) {
        console.error("Erro ao buscar texto:", error);
      }
    }

    getTexts();
  }, [user]); // Só roda quando o user mudar e não for null

  useEffect(() => {
    const checkViappd = async () => {
      try {
        const viappd = await AsyncStorage.getItem("hasViappd");
        if (viappd) {
          setHasViappd(true);
        } else {
          await AsyncStorage.setItem("hasViappd", "true"); // Marca como visitado após a primeira visita
        }
      } catch (error) {
        console.error("Erro ao acessar AsyncStorage:", error);
      }
    };

    checkViappd();
  }, []); // Executa apenas uma vez ao montar o componente

  useEffect(() => {
    if (hasViappd && texts.length > 0 && !isTyping) {
      let currentLine = 0;

      const startTyping = () => {
        if (currentLine < texts.length) {
          typeWriter(texts[currentLine], 0, () => {
            currentLine++;
            startTyping(); // Próxima linha
          });
        }
      };

      setIsTyping(true);
      startTyping();
    }
  }, [hasViappd, texts, isTyping]);

  const typeWriter = (text: string, index: number, callback: () => void) => {
    if (index < text.length) {
      setTypedText((prev) => prev + text[index]); // Adiciona o próximo caractere
      setTimeout(() => typeWriter(text, index + 1, callback), 20); // Tempo de digitação
    } else {
      // Quando a linha for completada, adiciona quebra de linha e chama o callback
      setTimeout(() => {
        setTypedText((prev) => prev + "\n");
        callback();
      }, 1000); // Espera 1 segundo antes de começar a próxima linha
    }
  };

  return (
    <View style={HomeStyles.container}>
      <Header icons={icons as any} />
      <ScrollView contentContainerStyle={HomeStyles.scrollContainer}>
        <LinearGradient
          colors={["#e41d69", "#fe8277"]}
          start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
          end={{ x: 1, y: 0 }}
          style={HomeStyles.home} // Usando o estilo do cabeçalho
        >
          <View style={HomeStyles.home}>
            <View style={HomeStyles.textos}>
              <Text style={HomeStyles.homeText}>{typedText}</Text>
            </View>
            <View style={HomeStyles.imagesHome}>
              <Image
                source={require("./assets/avatar3D1.png")}
                style={HomeStyles.avatarImage}
              />
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Home;
