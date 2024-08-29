import { StyleSheet, Platform } from 'react-native';

const StoreStyles = StyleSheet.create({
  container: {
    flex: 1,
},
  pointsSection: {
    marginTop: 100,
    textAlign: 'center',
    marginBottom: 20,
  },
  pointsTitle: {
    color: '#000',
    marginBottom: -30,
  },
  points: {
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor: '#e41d69',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  howToEarn: {
    color: '#000',
    fontSize: 18,
    marginTop: -20,
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
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  redeemButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  storeSection: {
    flexDirection: 'column',
    gap: 15,
  },
  storeSectionTitle: {
    color: '#fff',
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
  rewardImage: {
    width: 300,
    borderRadius: 15,
  },
  rewardDetails: {
    flex: 1,
    alignItems: 'center',
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    width: 200,
    height: 100,
  }
});

export default StoreStyles;