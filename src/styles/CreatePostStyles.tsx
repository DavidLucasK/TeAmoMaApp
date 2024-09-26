import { StyleSheet } from 'react-native';

const CreatePostStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawContainer: {
        
    },
    main: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    postsContainer: {
        width: '100%',
        height: '77%',
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
        fontFamily: 'Poppins_500Medium',
        padding: 10,
        width: '100%',
        height: 'auto', // Altura do TextInput
        minHeight: 150, // Altura do TextInput
        marginTop: 10,
        textAlignVertical: 'top', // Alinha o texto ao topo
        backgroundColor: '#fff', // Fundo branco para o campo de texto
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
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        padding: 5,
        marginBottom: 10,
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center', // Alinha o texto à esquerda
        backgroundColor: '#DDD',
        borderRadius: 10
    },
    cancelBtn: {
        fontFamily: 'Poppins_700Bold',
        alignSelf: 'center',
        color: '#FFF',
        backgroundColor: '#ff2b83',
        fontSize: 18,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
    },
    createBtn: {
        backgroundColor: '#ff0f6b',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        width: '40%',
        maxHeight: 100,
        alignSelf: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
    },
    createText: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
    },
    loadingCreate: {
        minWidth: '100%',
        maxHeight: '50%',
        resizeMode: 'contain',
    }
});

export default CreatePostStyles;