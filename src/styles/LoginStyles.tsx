import { StyleSheet} from 'react-native';

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    heading: {
        fontSize: 24,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    field: {
        marginBottom: 15,
    },
    input: {
        height: 50,
        fontFamily: 'Poppins_500Medium',
        borderColor: '#ccc',
        borderWidth: 1,
        textAlign: 'left',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    togglePassword: {
        color: '#ff0055',
        textAlign: 'right',
        marginBottom: 20,
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#ff0055',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
    textForget: {
        color: '#ff0055',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Poppins_500Medium',
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeText: {
        fontFamily: 'Poppins_500Medium',
    },
    createAccount: {
        alignItems: 'center',
    },
    createAccountText: {
        color: '#ff0055',
        fontFamily: 'Poppins_600SemiBold',
    },
    result: {
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default LoginStyles;