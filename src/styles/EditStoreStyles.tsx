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

const EditStoreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  noItems: {},
  plusBtn: {
    alignItems: "center",
    marginVertical: scaleHeight(20),
  },
  plus: {
    fontFamily: "Poppins_700Bold",
    fontSize: mediumFont,
    backgroundColor: "#e41d69",
    color: "#FFF",
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(10),
    textAlign: "center",
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
    marginVertical: scaleHeight(10),
    resizeMode: "cover",
  },
  itemTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
    textAlign: "center",
    marginTop: scaleHeight(10),
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
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingRight: 20,
    gap: 10,
  },
  iconTrash: {
    width: scaleWidth(22),
    height: scaleWidth(22),
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
  bordaBottom: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginVertical: scaleHeight(20),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.459)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#343a40",
    borderRadius: scaleWidth(10),
    padding: scaleWidth(20),
    alignItems: "center",
  },
  modalConfirmationContent: {
    width: "100%",
    height: "90%",
    marginTop: scaleHeight(120),
    backgroundColor: "#343a40",
    borderRadius: scaleWidth(10),
    padding: scaleWidth(20),
    alignItems: "center",
    justifyContent: "center",
    gap: scaleHeight(10),
  },
  modalTitle: {
    fontSize: mediumFont,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFF",
    marginBottom: scaleHeight(20),
    textAlign: "center",
  },
  modalTitleTime: {
    fontSize: largeFont,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFF",
    marginBottom: scaleHeight(20),
    textAlign: "center",
  },
  modalSubTitle: {
    fontSize: mediumFont,
    fontFamily: "Poppins_500Medium",
    color: "#FFF",
    marginBottom: scaleHeight(20),
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonCancel: {
    backgroundColor: "#606c77",
    padding: scaleWidth(10),
    borderRadius: scaleWidth(5),
    width: "48%",
    alignItems: "center",
  },
  buttonConfirm: {
    backgroundColor: "#e41d69",
    padding: scaleWidth(10),
    borderRadius: scaleWidth(5),
    width: "48%",
    alignItems: "center",
  },
  buttonText1: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFF",
    textAlign: "center",
  },
  textSkeleton: {
    width: imageWidth / 1.2,
    height: imageHeight / 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginVertical: 8,
    marginTop: 10,
    alignSelf: "center",
  },
  imagePlaceholder: {
    width: imageWidth,
    height: imageHeight,
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default EditStoreStyles;
