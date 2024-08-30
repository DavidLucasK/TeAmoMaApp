import { StyleSheet, Platform } from 'react-native';

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    home: {
        color: '#fff',
        width: '100%',
        height: '100%',
        paddingTop: 20, // 7.5rem em pixels
        textAlign: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    textos: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign:'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    homeText: {
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
        fontSize: 20, // 1.5rem em pixels
        color: '#fff', // Cor do texto
        lineHeight: 50,
    },
    imagesHome: {
        display: 'flex',
        position: 'absolute',
        maxWidth: '100%',
        bottom: 0,
        left: '50%', // Para centralizar
        transform: [{ translateX: -175 }], //Para centralizar
    },
    avatarImage: {
        width: 350, // 25rem em pixels
        height: 350, // Ajuste conforme necessário
    },
});

export default HomeStyles;