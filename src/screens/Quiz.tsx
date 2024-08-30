import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, Image } from 'react-native';
import CustomAlert from '../components/CustomAlert';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import { LinearGradient } from 'expo-linear-gradient'; // Importando LinearGradient
import QuizStyles from '../styles/QuizStyles';
import { QuizNavigationProp } from '../navigation';

type OptionStyle = {
    backgroundColor: string;
    borderBlockColor: string;
} | null;

const backendUrl = 'https://backendlogindl.vercel.app/api/auth';

const Quiz: React.FC = () => {
    const navigation = useNavigation<QuizNavigationProp>();
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [points, setPoints] = useState<number>(0);
    const [quizStatus, setQuizStatus] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertTitle, setAlertTitle] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    useEffect(() => {

        const checkQuizStatus = () => {
            if (quizStatus) {
                setAlertTitle('Você já completou o quiz hoje!');
                setAlertMessage('Volte amanhã ❤️');
                setShowAlert(true);
            } else {
                setLoading(false);
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${backendUrl}/questions`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) throw new Error('Falha ao buscar perguntas.');

                const data = await response.json();
                setQuestions(data);
                await fetchQuizStatus();
                checkQuizStatus();
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchQuestions();
    }, []);

    const fetchQuizStatus = async () => {
        try {
            const response = await fetch(`${backendUrl}/quiz-status`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Falha ao buscar status do quiz.');

            const data = await response.json();
            setQuizStatus(data.is_completed);
        } catch (error) {
            console.error('Erro:', error);
            setQuizStatus(false);
        }
    };

    const updatePoints = async () => {
        try {
            const response = await fetch(`${backendUrl}/update-points`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'amor',
                    pointsEarned: points,
                }),
            });

            if (!response.ok) throw new Error('Falha ao atualizar pontos.');

            setAlertTitle('Quiz Concluído!');
            setAlertMessage(`Você ganhou ${points} pontos.`);
            setShowAlert(true);
            await updateQuizStatus();
            navigation.navigate('EarnPoints')//Está funcionando normal
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const updateQuizStatus = async () => {
        try {
            const response = await fetch(`${backendUrl}/update-quiz-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Falha ao atualizar status do quiz.');

            console.log('Status do quiz atualizado com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const resetOptionStyles = () => {
        setSelectedOptionIndex(null); // Reseta o índice da opção selecionada
        setIsOptionSelected(false); // Reseta a seleção da opção
    };

    const selectOption = (index: number) => {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedOption = currentQuestion.answers[index];

        if (!isOptionSelected) { // Verifica se uma opção já foi selecionada
            setSelectedOptionIndex(index);
            setIsOptionSelected(true); // Marca que uma opção foi selecionada

            // Adiciona pontos se a resposta estiver correta
            if (selectedOption.is_correta) {
                setPoints((prevPoints) => prevPoints + 50); // Adiciona 50 pontos por resposta correta
            }

            // Atualiza o estado do quiz para mostrar a próxima pergunta
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                resetOptionStyles(); // Reseta os estilos ao mudar de pergunta
            } else {
                updatePoints(); // Atualiza os pontos ao final do quiz
            }
        }
    };

    if (loading) {
        return (
            <View style={QuizStyles.quizContainer}>
            <LinearGradient
                colors={['#e41d69', '#fe8277']}
                start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
                end={{ x: 1, y: 0 }}
                style={QuizStyles.quizContainer} // Usando o estilo do cabeçalho
            >
                <TouchableOpacity style={QuizStyles.voltar} onPress={() => navigation.navigate('EarnPoints')}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
                <View style={QuizStyles.card}>
                    <Image
                    source={require('./assets/loading.gif')} // Caminho para o seu GIF
                    style={QuizStyles.loadingImage}
                    resizeMode="contain" // Ajusta o modo de redimensionamento
                    />
                </View>
            </LinearGradient>
        </View>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (quizStatus) {
        return (
            <View style={QuizStyles.quizContainer}>
            <LinearGradient
                colors={['#e41d69', '#fe8277']}
                start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
                end={{ x: 1, y: 0 }}
                style={QuizStyles.quizContainer} // Usando o estilo do cabeçalho
            >
                <View style={QuizStyles.card}>
                    <Text style={QuizStyles.titleBack}>Você já completou o quiz hoje!</Text>
                    <Text style={QuizStyles.titleBack}>Volte amanhã ❤️</Text>
                    <TouchableOpacity style={QuizStyles.btnBack} onPress={() => navigation.navigate('EarnPoints')}>
                        <Text style={QuizStyles.textBack}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
        );
    }
    else 
    {
        return (
            <View style={QuizStyles.quizContainer}>
                <LinearGradient
                    colors={['#e41d69', '#fe8277']}
                    start={{ x: 0, y: 0 }} // Início do gradiente (canto superior esquerdo)
                    end={{ x: 1, y: 0 }}
                    style={QuizStyles.quizContainer} // Usando o estilo do cabeçalho
                >
                    <TouchableOpacity style={QuizStyles.voltar} onPress={() => navigation.navigate('EarnPoints')}>
                        <Text>Voltar</Text>
                    </TouchableOpacity>
                    <View style={QuizStyles.card}>
                        <Text style={QuizStyles.question}>{currentQuestion.pergunta}</Text>
                        <ScrollView style={QuizStyles.options}>
                            {currentQuestion.answers.map((answer: any, index: number) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        QuizStyles.option,
                                        selectedOptionIndex === index && answer.is_correta ? QuizStyles.correct : {},
                                        selectedOptionIndex === index && !answer.is_correta ? QuizStyles.incorrect : {},
                                    ]}
                                    onPress={() => selectOption(index)}
                                    disabled={isOptionSelected} // Desabilita a opção se uma opção já foi selecionada
                                >
                                    <Text>{answer.resposta}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <View style={QuizStyles.buttonContainer}>
                            <Button title="Pergunta Anterior" onPress={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))} disabled={currentQuestionIndex === 0} />
                            <Button
                                title="Próxima Pergunta"
                                onPress={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
                                disabled={currentQuestionIndex === questions.length - 1}
                            />
                        </View>
                    </View>
                    <CustomAlert
                        visible={showAlert}
                        title={alertTitle}
                        message={alertMessage}
                        onClose={() => setShowAlert(false)}
                    />
                </LinearGradient>
            </View>
        );
    }

};

export default Quiz;