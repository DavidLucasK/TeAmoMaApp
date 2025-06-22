import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const clamp = (min: number, preferred: number, max: number) => {
  return Math.min(Math.max(preferred, min), max);
};

// Escala proporcional para largura e altura
const scaleWidth = (value: number) => (screenWidth / 375) * value; // Base iPhone 11 Pro
const scaleHeight = (value: number) => (screenHeight / 812) * value;

// Tamanhos de fontes responsivos
const smallFont = clamp(12, screenWidth * 0.035, 16);
const mediumFont = clamp(16, screenWidth * 0.045, 20);
const largeFont = clamp(20, screenWidth * 0.055, 28);
const xLargeFont = clamp(24, screenWidth * 0.065, 32);

const horizontalPadding = scaleWidth(20);

const StoreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  plusBtn: {
    display: "flex",
  },
  plus: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
    color: "#FFF",
    backgroundColor: "#e41d69",
    width: "100%",
    padding: scaleHeight(5),
    paddingHorizontal: scaleWidth(15),
    borderRadius: scaleWidth(10),
  },
  pointsSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pointsTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
    color: "#000",
    marginBottom: scaleHeight(5),
  },
  borderImage: {
    height: scaleHeight(17),
    width: scaleWidth(360),
    left: scaleWidth(17),
    marginTop: scaleHeight(-7),
    borderBottomLeftRadius: scaleWidth(15),
    borderBottomRightRadius: scaleWidth(15),
    zIndex: 3,
  },
  borderRedeem: {
    height: scaleHeight(17),
    width: scaleWidth(125),
    marginTop: scaleHeight(-33),
    borderBottomLeftRadius: scaleWidth(15),
    borderBottomRightRadius: scaleWidth(15),
    zIndex: 3,
  },
  points: {
    fontSize: xLargeFont,
    fontFamily: "Poppins_700Bold",
    color: "white",
  },
  howToEarn: {
    fontFamily: "Poppins_500Medium",
    color: "#000",
    fontSize: mediumFont,
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  redeemButton: {
    backgroundColor: "#e41d69",
    color: "white",
    marginTop: scaleHeight(10),
    paddingVertical: scaleHeight(7),
    paddingHorizontal: scaleWidth(16),
    borderRadius: scaleWidth(15),
    marginBottom: scaleHeight(20),
  },
  redeemButtonText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: mediumFont,
  },
  storeSection: {
    flexDirection: "column",
    marginTop: scaleHeight(20),
  },
  storeSectionTitle: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
  },
  rewardItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: "white",
    padding: scaleWidth(15),
    borderRadius: scaleWidth(15),
    marginBottom: scaleHeight(15),
  },
  rewardDetails: {
    flex: 1,
    alignItems: "center",
  },
  rewardTitle: {
    fontSize: mediumFont,
    fontFamily: "Poppins_700Bold",
  },
  rewardDescription: {
    marginVertical: scaleHeight(4),
    fontSize: smallFont,
  },
  rewardPoints: {
    marginVertical: scaleHeight(4),
    fontSize: smallFont,
  },
  leftSide: {},
  itemImage: {
    alignSelf: "center",
    width: screenWidth - horizontalPadding * 2,
    height: (screenWidth - horizontalPadding * 2) * 0.66,
    objectFit: "cover",
    borderRadius: scaleWidth(10),
    elevation: 5,
    marginVertical: scaleHeight(10),
  },
  itemTitle: {
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: xLargeFont,
  },
  itemDescription: {
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    fontSize: mediumFont,
    paddingHorizontal: horizontalPadding,
    paddingTop: scaleHeight(10),
  },
  itemPoints: {
    fontFamily: "Poppins_500Medium",
    fontSize: mediumFont,
  },
  itemPoints2: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
  },
  containerLoading: {
    width: "100%",
  },
  loadingImage: {
    alignSelf: "center",
    width: "70%",
    marginBottom: scaleHeight(-50),
    marginTop: scaleHeight(-50),
  },
  bordaBottom: {
    borderBlockColor: "#eee",
    borderBottomWidth: 1.5,
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(20),
  },
  loadingPoints: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingItems: {
    marginVertical: scaleHeight(80),
    alignItems: "center",
    justifyContent: "center",
  },
  containerNoItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalPadding,
  },
  noItems: {
    fontWeight: "500",
    fontSize: largeFont,
    textAlign: "center",
    color: "#838383",
    paddingHorizontal: horizontalPadding,
  },
  pointsContainer: {
    backgroundColor: "#e41d69",
    paddingVertical: scaleHeight(10),
    paddingHorizontal: horizontalPadding,
    borderRadius: scaleWidth(5),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleHeight(10),
    zIndex: 2,
  },
});

export default StoreStyles;
