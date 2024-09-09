import { StyleSheet, Platform } from 'react-native';

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    profileInfo: {
        display: 'flex',
        backgroundColor: '#ffffff5b',
        borderRadius: 8,
        width: 340,
        height: 500,
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: -100,
    },
    profileImage: {
        width: 230,
        height: 230,
        borderRadius: 250,
        marginBottom: 8,
        backgroundColor: '#79797957'
    },
    changePhotoButton: {
        backgroundColor: '#Fff',
        padding: 7,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginTop: 20,
        color: '#ff006a',
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
        color: '#FFF'
    },
    variable: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        
    },
    pointsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 15,
    },
    points: {
        fontSize: 24,
        padding: 5,
        marginLeft: 4,
        fontFamily: 'Poppins_700Bold',
        backgroundColor: '#e41d69',
        color: 'white',
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
});

export default ProfileStyles;