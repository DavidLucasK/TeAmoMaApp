import { StyleSheet, Dimensions, Platform } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const clamp = (min: number, preferred: number, max: number) => {
  return Math.min(Math.max(preferred, min), max);
};

const scaleWidth = (value: number) => (screenWidth / 375) * value; // Base iPhone 11 Pro
const scaleHeight = (value: number) => (screenHeight / 812) * value;

const smallFont = clamp(12, screenWidth * 0.035, 16);
const mediumFont = clamp(16, screenWidth * 0.045, 20);
const largeFont = clamp(20, screenWidth * 0.055, 28);
const xLargeFont = clamp(24, screenWidth * 0.065, 32);

const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: scaleHeight(40),
  },
  profileInfo: {
    display: "flex",
    backgroundColor: "#ffffff5b",
    borderRadius: scaleWidth(8),
    width: scaleWidth(340),
    marginBottom: scaleHeight(50),
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: scaleHeight(20),
    marginTop: scaleHeight(-100),
  },
  profileImage: {
    width: scaleWidth(120),
    height: scaleWidth(120),
    borderRadius: scaleWidth(60),
    backgroundColor: "#79797957",
  },
  changePhotoButton: {
    backgroundColor: "#FFF",
    paddingVertical: scaleHeight(7),
    paddingHorizontal: scaleWidth(15),
    borderRadius: scaleWidth(15),
    marginTop: scaleHeight(10),
    color: "#ff006a",
    fontFamily: "Poppins_700Bold",
    fontSize: mediumFont,
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    gap: scaleHeight(5),
  },
  textos: {
    flexDirection: "column",
  },
  info: {
    fontFamily: "Poppins_700Bold",
    fontSize: mediumFont,
    color: "#FFF",
  },
  variable: {
    fontFamily: "Poppins_700Bold",
    fontSize: mediumFont,
  },
  points: {
    fontSize: xLargeFont,
    padding: scaleHeight(5),
    marginLeft: scaleWidth(4),
    fontFamily: "Poppins_700Bold",
    backgroundColor: "#FFF",
    color: "#e41d69",
    paddingHorizontal: scaleWidth(15),
    borderRadius: scaleWidth(5),
  },
  textInput: {
    backgroundColor: "#FFF",
    fontFamily: "Poppins_600SemiBold",
    fontSize: mediumFont,
    minWidth: scaleWidth(300),
    maxWidth: scaleWidth(300),
    textAlign: "center",
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(5),
    borderRadius: scaleWidth(10),
  },
  updateButton: {
    marginTop: scaleHeight(10),
  },
  updateButtonText: {
    fontFamily: "Poppins_700Bold",
    backgroundColor: "#e41d69",
    color: "white",
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(15),
    borderRadius: scaleWidth(15),
    fontSize: mediumFont,
    textAlign: "center",
  },
  logoutButton: {
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(20),
  },
  logoutButtonText: {
    fontFamily: "Poppins_700Bold",
    backgroundColor: "#e41d69",
    color: "white",
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(15),
    borderRadius: scaleWidth(15),
    fontSize: mediumFont,
    textAlign: "center",
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: scaleWidth(10),
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(30),
    paddingBottom: scaleHeight(20),
    width: "80%",
  },
  modalText: {
    fontSize: largeFont,
    padding: scaleHeight(5),
    marginBottom: scaleHeight(10),
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    backgroundColor: "#DDD",
    borderRadius: scaleWidth(10),
  },
  cancelBtn: {
    fontFamily: "Poppins_700Bold",
    alignSelf: "center",
    color: "#FFF",
    backgroundColor: "#ff2b83",
    fontSize: largeFont,
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(5),
    borderRadius: scaleWidth(15),
  },
});

export default ProfileStyles;
