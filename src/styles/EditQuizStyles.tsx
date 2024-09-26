import { StyleSheet, Platform } from 'react-native';

const EditQuizStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 20,
        color: '#FFF'
    },
    games: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#f2f2f2',
        padding: 50,
        paddingVertical: 50,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 30,
    },
    disabledCard: {
        opacity: 0.7,
    },
    cardTitle: {
        fontSize: 28,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 10,
        color: '#e41d69',
        alignSelf: 'center'
    },
    cardText: {
        textAlign: 'center',
        fontFamily: 'Poppins_500Medium',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#e41d69',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
    },
    disabledButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    disabledButtonText: {
        color: '#666',
        fontWeight: 'bold',
    },
    imagesGames: {
        display: 'flex',
        position: 'absolute',
        maxWidth: '100%',
        opacity: 0.1,
        alignSelf: 'flex-end',
        padding: 20
    },
    editIcon: {
        width: 24, // 25rem em pixels
        height: 24, // Ajuste conforme necessário
    },
    questionContainer: {
        backgroundColor: '#fff', // Cor de fundo do container de cada pergunta
        padding: 15, // Espaçamento interno do container
        marginVertical: 8, // Espaçamento entre os containers
        marginHorizontal: 16, // Espaçamento nas laterais
        borderRadius: 8, // Bordas arredondadas do container
        shadowColor: '#000', // Cor da sombra (somente iOS)
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra (somente iOS)
        shadowOpacity: 0.1, // Opacidade da sombra (somente iOS)
        shadowRadius: 4, // Raio da sombra (somente iOS)
        elevation: 3, // Elevação (somente Android)
      },
      questionText: {
        fontSize: 16, // Tamanho da fonte do texto da pergunta
        fontWeight: 'bold', // Peso da fonte
        color: '#333', // Cor do texto
      },
      noQuestionsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
      },
});

export default EditQuizStyles;