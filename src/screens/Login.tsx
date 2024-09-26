import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LoginStyles from '../styles/LoginStyles';
import { LoginNavigationProp } from '../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrigido
import { useAppContext } from '../context/AppContext';

const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');
    const [resultColor, setResultColor] = useState<string>('black');

    const navigation = useNavigation<LoginNavigationProp>();
    const { setUser, setPartnerId } = useAppContext();

    const handleLogin = async () => {
        const emailInput = email.trim();
        const passwordInput = password.trim();
    
        setIsLoading(true);
    
        try {
            const response = await axios.post(`${backendUrl}/login`, 
                { email: emailInput, password: passwordInput },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
    
            const { data } = response;
            console.log('retornou', data);
            console.log('o userId é:', data.userId);

            setResult(data.message || 'Login bem-sucedido!');
            setResultColor(response.status === 200 ? 'green' : 'red');
    
            if (response.status === 200) {
                await AsyncStorage.removeItem('userId');
                await AsyncStorage.setItem('authToken', data.token);
                await AsyncStorage.setItem('userId', data.userId.toString()); // Converte userId para string
                setUser(data.userId); // Atualiza o estado do usuário no contexto, convertendo para número
                console.log(data.userId);
                setTimeout(() => {
                    navigation.navigate('Home'); // Ajuste para a navegação real em seu app
                }, 2000);
            }
        } catch (error) {
            setResult('Erro ao fazer login. \nTente novamente mais tarde.');
            setResultColor('red');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={LoginStyles.container}>
            <Image style={LoginStyles.logo} source={require('./assets/Logo-rounded.png')} />
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
                        {showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={LoginStyles.button} onPress={handleLogin} disabled={isLoading}>
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
                    <Text style={[LoginStyles.result, { color: resultColor }]}>{result}</Text>
                ) : null}
            </View>
        </View>
    );
};

export default Login;
