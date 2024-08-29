import { StyleSheet, Platform } from 'react-native';

const HeaderStyles = StyleSheet.create({
    header: {
        display: 'flex',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        ...Platform.select({
            ios: {
              shadowColor: '#171717',
              shadowOffset: { width: 6, height: 4 },
              shadowOpacity: 0.6,
              shadowRadius: 4,
            },
            android: {
              elevation: 10,
            },
          }),
    },
    headerContent: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    shadowProp: {  
        shadowColor: '#171717',  
        shadowOffset: {width: 6, height: 4},  
        shadowOpacity: 0.6,  
        shadowRadius: 4,  
      },  
    elevation: {   
        elevation: 30,  
        backgroundColor: 'black', // Certifique-se de ter um fundo para ver a sombra
        padding: 10,
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