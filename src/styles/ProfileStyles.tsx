import { StyleSheet, Platform } from 'react-native';

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff5b',
        borderRadius: 8,
        padding: 28,
        width: 340,
        height: 500,
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 8,
        backgroundColor: 'grey'
    },
    changePhotoButton: {
        backgroundColor: '#Fff',
        padding: 7,
        paddingHorizontal: 15,
        borderRadius: 15,
        color: '#007aff',
        fontSize: 16,
    },
    textContainer: {
        marginBottom: 16,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 20,
        marginBottom: 4,
    },
    bold: {
        fontWeight: 'bold',
    },
    pointsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    points: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 4,
    },
});

export default ProfileStyles;