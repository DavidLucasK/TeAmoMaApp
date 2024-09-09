import { StyleSheet, Platform } from 'react-native';

const PostsStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingBottom: 40,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    postsContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        paddingHorizontal: '5%',
        marginBottom: 120,
        borderRadius: 30,
        paddingBottom: 100,
        backgroundColor: '#FFF',
        overflow: 'hidden',
    },
    plusBtn: {
        display: 'flex',
        height: 40,
        marginTop: 25,
        marginBottom: 25,
    },
    plus: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        marginBottom: 0,
        paddingBottom: 0,
        resizeMode: 'contain',
    },
    post: {
        marginTop: 24,
        alignSelf: 'center',
    },
    user: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
        color: '#ff0055',
        marginBottom: -10,
    },
    imageContainer: {
        minWidth: 285,
        minHeight: 405, // Ajuste conforme necessário
        maxWidth: 285,
        maxHeight: 405, // Ajuste conforme necessário
        marginBottom: 16,
        backgroundColor: '#000',
        overflow: 'hidden', // Garante que o conteúdo não ultrapasse o contêiner
        borderWidth: 0,
        borderColor: '#000', // Cor da borda
        borderRadius: 10,
    },
    iconsContainer:{
        display: 'flex',
        width: 40,
        height: 40,
        marginVertical: 2,
    },
    heart: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imagePost: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // Usa o
    },
    textBottom: {
        textAlign: 'left',
        maxWidth: 285,
        fontFamily: 'Poppins_500Medium',
        color: '#363636'
    },
    tempo: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 12,
        color: '#585858'
    },
    bordaBottom: {
        borderBlockColor: '#ddd',
        borderBottomWidth: 1,
        marginTop: 20
    },
    loadingImage: {

    },
    noPostsText: {
        fontFamily: 'Poppins_500Medium',
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 200,
        paddingBottom: 300,
        color: '#585858'
    },
    iconCam: {
        backgroundColor: 'red',
        width: '100%'
    },
    loadingIcon: {
        marginTop: 200,
    },
});

export default PostsStyles;