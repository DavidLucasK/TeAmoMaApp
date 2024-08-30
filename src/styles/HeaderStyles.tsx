import { StyleSheet, Platform } from 'react-native';

const HeaderStyles = StyleSheet.create({
    header: {
        display: 'flex',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingLeft: 20,
    },
    headerContent: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        fontFamily: 'Poppins_700Bold',
        color: 'white',
        fontSize: 26,
        
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 20,
    },
});

export default HeaderStyles;