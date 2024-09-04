import { StyleSheet, Platform } from 'react-native';

const StoreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'

},
  pointsSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  pointsTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 5,
  },
  border: {
    height: 17,
    width: 285,
    marginTop: -19,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    zIndex: 3,
},
  points: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    backgroundColor: '#e41d69',
    padding: 10,
    color: 'white',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
    zIndex: 2,
  },
  howToEarn: {
    fontFamily: 'Poppins_700Bold',
    color: '#000',
    fontSize: 18,
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  redeemButton: {
    backgroundColor: '#e41d69',
    color: 'white',
    marginTop: 10,
    padding: 7,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginBottom: 20,
  },
  redeemButtonText: {
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
  },
  storeSection: {
    flexDirection: 'column',
    marginTop: 20,
  },
  storeSectionTitle: {
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  rewardDetails: {
    flex: 1,
    alignItems: 'center',
  },
  rewardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  rewardDescription: {
    marginVertical: 4,
  },
  rewardPoints: {
    marginVertical: 4,
  },
  leftSide: {
  },
  itemImage: {
    alignSelf: 'center',
    width: 360,
    height: 240,
    objectFit: 'cover',
    borderRadius: 20,
  },
  itemTitle: {
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
  },
  itemDescription: {
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  itemPoints: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
  },
  containerLoading: {
    width: '100%',
  },
  loadingImage: {
    alignSelf: 'center',
    width: '70%',
    marginBottom: -50,
    marginTop: -50,
  },
  noItems: {
    
  },
});

export default StoreStyles;