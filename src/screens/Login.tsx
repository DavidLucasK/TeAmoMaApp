import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginStyles from "../styles/LoginStyles";
import { LoginNavigationProp } from "../navigation";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Corrigido
import { useAppContext } from "../context/AppContext";

const backendUrl = "https://backendlogindl.vercel.app/api/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [resultColor, setResultColor] = useState<string>("black");

  const navigation = useNavigation<LoginNavigationProp>();
  const { setUser, setPartnerId } = useAppContext();

  const handleLogin = async () => {
    const emailInput = email.trim();
    const passwordInput = password.trim();

    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });

      const data = await response.json();
      console.log("Resposta do backend:", data);

      if (response.ok) {
        setResult(data.message || "Login bem-sucedido!");
        setResultColor("green");

        // Salvar dados no AsyncStorage
        await AsyncStorage.removeItem("userId");

        // Salva token sempre
        await AsyncStorage.setItem("authToken", data.token);

        // Valida e salva userId
        if (data.userId !== undefined && data.userId !== null) {
          await AsyncStorage.setItem("userId", data.userId.toString());
          setUser(data.userId);
        } else {
          console.warn("userId não retornado no login.");
        }

        // Valida e salva partnerId
        if (data.partnerId !== undefined && data.partnerId !== null) {
          await AsyncStorage.setItem("partnerId", data.partnerId.toString());
          setPartnerId(data.partnerId);
        } else {
          console.warn("partnerId não retornado no login.");
        }

        console.log("userId:", data.userId, "partnerId:", data.partnerId);

        setTimeout(() => {
          navigation.navigate("Home");
        }, 2000);
      } else {
        setResult(data.message || "Erro ao fazer login.");
        setResultColor("red");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setResult("Erro ao fazer login. Tente novamente mais tarde.");
      setResultColor("red");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={LoginStyles.container}>
      <Image
        style={LoginStyles.logo}
        source={require("./assets/Logo-rounded.png")}
      />
      <Text style={LoginStyles.heading}>Entrar</Text>
      <View style={LoginStyles.form}>
        <View style={LoginStyles.field}>
          <TextInput
            style={LoginStyles.input}
            placeholder="Email ou usuário"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View style={LoginStyles.field}>
          <TextInput
            style={LoginStyles.input}
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={handleTogglePasswordVisibility}>
          <Text style={LoginStyles.togglePassword}>
            {showPassword ? "Ocultar Senha" : "Mostrar Senha"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={LoginStyles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={LoginStyles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={LoginStyles.textForget}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <View style={LoginStyles.rememberMe}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
            <Text style={LoginStyles.rememberMeText}>Lembre-se de mim</Text>
          </TouchableOpacity>
        </View>
        <View style={LoginStyles.createAccount}>
          <Text>Novo por aqui?</Text>
          <TouchableOpacity>
            <Text style={LoginStyles.createAccountText}>Crie uma conta</Text>
          </TouchableOpacity>
        </View>
        {result ? (
          <Text style={[LoginStyles.result, { color: resultColor }]}>
            {result}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default Login;
