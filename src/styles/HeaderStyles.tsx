import { StyleSheet, Platform } from 'react-native';

const HeaderStyles = StyleSheet.create({
    header: {
        display: 'flex',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
    },
    headerContent: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
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