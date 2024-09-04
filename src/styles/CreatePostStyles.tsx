import { StyleSheet } from 'react-native';

const CreatePostStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    postsContainer: {
        width: '100%',
        height: '70%',
        display: 'flex',
        paddingHorizontal: '5%',
        borderRadius: 30,
        backgroundColor: '#FFF',
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
        elevation: 15,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        marginTop: -50,
        maxHeight: 320,
        marginBottom: 16,
        backgroundColor: '#00000024',
        borderRadius: 10,
        overflow: 'hidden', // Garante que o conteúdo não ultrapasse o contêiner
    },
    imageUploaded: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    photosContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    textInput: {
        borderColor: '#ccc', // Cor da borda
        borderWidth: 2, // Largura da borda
        borderRadius: 10, // Bordas arredondadas
        padding: 10,
        width: '100%',
        height: 'auto', // Altura do TextInput
        minHeight: 150, // Altura do TextInput
        marginTop: 10,
        textAlignVertical: 'top', // Alinha o texto ao topo
        backgroundColor: '#fff', // Fundo branco para o campo de texto
    },
    createBtn: {
        backgroundColor: '#e41d69',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        width: '40%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    createText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
    },
    camContainer: {
        display: 'flex',
    },
    iconCam: {
        width: '30%',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'left', // Alinha o texto à esquerda
    },
});

export default CreatePostStyles;