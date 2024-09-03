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
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    postsContainer: {
        width: '100%',
        display: 'flex',
        paddingHorizontal: '5%',
        marginVertical: '10%',
        borderRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#FFF',
    },
    plusBtn: {
        display: 'flex',
        height: 40,
        marginVertical: 15,
    },
    plus: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        marginBottom: 0,
        paddingBottom: 0,
        resizeMode: 'contain',
    },
    posts: {
        display: 'flex',
        flexDirection: 'column',
    },
    post: {
        marginBottom: 64,
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
        maxHeight: 255, // Ajuste conforme necessário
        marginBottom: 16,
        backgroundColor: '#000',
        overflow: 'hidden', // Garante que o conteúdo não ultrapasse o
        borderWidth: 0,
        borderColor: '#000', // Cor da borda
        borderRadius: 10,
    },
    iconsContainer:{
        display: 'flex',
        width: 40,
        height: 40,
        marginVertical: 10,
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
        maxWidth: 285
    },
    tempo: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 12,
        color: '#585858'
    },
    userBottom: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: '#000'
    }
});

export default PostsStyles;