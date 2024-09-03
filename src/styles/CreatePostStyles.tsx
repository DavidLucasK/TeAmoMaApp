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
        maxHeight: 280,
        marginBottom: 16,
        backgroundColor: '#00000024',
        overflow: 'hidden', // Garante que o conteúdo não ultrapasse o contêiner
        borderWidth: 0,
        borderRadius: 10,
    },
    imageUploaded: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    photosContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 220,
        width: '100%',
    },
    galleryBtn: {
        backgroundColor: '#e41d69',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    textGallery: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    },
    photoBtn: {
        backgroundColor: '#e41d69',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    textPhoto: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    },
    textInput: {
        borderColor: '#ccc', // Cor da borda
        borderWidth: 2, // Largura da borda
        borderRadius: 10, // Bordas arredondadas
        padding: 10,
        width: '100%',
        height: 'auto', // Altura do TextInput
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
});

export default CreatePostStyles;