import { StyleSheet, Platform } from 'react-native';

const AddPartnerStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        color: '#FFF',
        fontSize: 28,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        display: 'flex',
        backgroundColor: '#ffffff5b',
        borderRadius: 8,
        marginTop: -20,
        width: 340,
        height: 530,
    },
    photoContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 250,
        backgroundColor: '#79797957'
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
    points: {
        fontSize: 24,
        padding: 5,
        marginLeft: 4,
        marginTop: 25,
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

export default AddPartnerStyles;