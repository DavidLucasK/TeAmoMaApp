import { StyleSheet, Platform } from 'react-native';

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    storeSection: {
        flexDirection: 'column',
        marginTop: 20,
        
        overflow: 'hidden',
      },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 35
    },
    profileInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: '#ffffff5b',
        borderRadius: 15, // Aumenta o arredondamento das bordas
        width: '90%', // Ajusta a largura para 90% da tela
        maxWidth: 400, // Define uma largura máxima para a seção
        paddingVertical: 20, // Adiciona padding vertical para espaçamento interno
        paddingHorizontal: 25, // Adiciona padding horizontal para espaçamento interno
        marginBottom: 30, // Margem inferior para espaçamento
      },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: -100,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 250,
        backgroundColor: '#79797957'
    },
    changePhotoButton: {
        backgroundColor: '#Fff',
        padding: 7,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginTop: 10,
        color: '#e41d69',
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
    },
    textContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    textos: {
        flexDirection: 'column',
    },
    info: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
    },
    variable: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        
    },
    points: {
        fontSize: 24,
        padding: 5,
        marginLeft: 4,
        fontFamily: 'Poppins_700Bold',
        backgroundColor: '#FFF',
        color: '#e41d69',
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    textInput: {
        backgroundColor: '#FFF',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        minWidth: 300,
        maxWidth: 300,
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
    },
    updateButton: {
        marginTop: 15,
    },
    updateButtonText: {
        fontFamily: 'Poppins_700Bold',
        backgroundColor: '#e41d69',
        textAlign: 'center',
        color: 'white',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    logoutButtonText: {
        fontFamily: 'Poppins_700Bold',
        backgroundColor: '#ff567b',
        textAlign: 'center',
        color: 'white',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
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
    infosContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
});

export default ProfileStyles;