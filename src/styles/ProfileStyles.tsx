import { StyleSheet, Platform } from 'react-native';

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
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
    photoBefore: {
        width: 250,
        height: 250,
        borderRadius: 250,
        marginBottom: -240,
        backgroundColor: '#ffffff75',
        zIndex: -2,
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
        fontFamily: 'Poppins_700Bold',
        marginLeft: 4,
        backgroundColor: '#e41d69',
        padding: 5,
        paddingHorizontal: 15,
        color: 'white',
        borderRadius: 5,
    },
});

export default ProfileStyles;