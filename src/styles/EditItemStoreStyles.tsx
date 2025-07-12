import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const clamp = (min: number, preferred: number, max: number) =>
  Math.min(Math.max(preferred, min), max);

const scaleWidth = (value: number) => (screenWidth / 375) * value;
const scaleHeight = (value: number) => (screenHeight / 812) * value;

const smallFont = clamp(12, screenWidth * 0.035, 16);
const mediumFont = clamp(16, screenWidth * 0.045, 20);
const largeFont = clamp(20, screenWidth * 0.055, 28);
const xLargeFont = clamp(24, screenWidth * 0.065, 32);

const imageWidth = screenWidth - scaleWidth(40);
const imageHeight = imageWidth * 0.66;

const EditItemStoreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  textInput: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: mediumFont,
    textAlign: "center",
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(16),
    borderRadius: scaleWidth(10),
    backgroundColor: "#FFF",
    alignSelf: "center",
    width: scaleWidth(300),
  },
  itemImage: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: scaleWidth(10),
    alignSelf: "center",
    resizeMode: "cover",
  },
  itemTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
    textAlign: "center",
  },
  itemDescription: {
    fontFamily: "Poppins_500Medium",
    fontSize: mediumFont,
    textAlign: "center",
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(10),
  },
  itemPoints: {
    fontFamily: "Poppins_500Medium",
    fontSize: mediumFont,
    color: "#000",
    textAlign: "center",
    marginTop: scaleHeight(8),
  },
  itemPoints2: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
    textAlign: "center",
    color: "#e41d69",
  },
  iconTrash: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginTop: scaleHeight(10),
    alignSelf: "flex-end",
    marginRight: scaleWidth(20),
  },
  rewardItem: {
    backgroundColor: "#FFF",
    borderRadius: scaleWidth(15),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(20),
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  button: {
    backgroundColor: "#e41d69",
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(30),
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonBack: {
    backgroundColor: "#e41d69",
    paddingVertical: scaleHeight(5),
    paddingHorizontal: scaleWidth(10),
    marginHorizontal: scaleWidth(20),
    marginVertical: scaleHeight(20),
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  buttonBackText: {
    color: "#FFF",
    fontFamily: "Poppins_700Bold",
    fontSize: mediumFont,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: smallFont,
  },
});

export default EditItemStoreStyles;
