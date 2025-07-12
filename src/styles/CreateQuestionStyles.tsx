import { StyleSheet, Dimensions } from "react-native";

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

const CreateQuestionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  main: {
    flex: 1,
    paddingTop: scaleHeight(20),
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(20),
  },
  titleScreen: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
    color: "#FFF",
    marginBottom: scaleHeight(10),
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: scaleWidth(20),
    width: "100%",
    padding: scaleWidth(20),
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
    color: "#e41d69",
    marginBottom: scaleHeight(10),
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
    color: "#e41d69",
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(10),
  },
  inputQuestion: {
    borderWidth: 2,
    borderColor: "#e41d69",
    borderRadius: scaleWidth(12),
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(15),
    fontFamily: "Poppins_500Medium",
    fontSize: mediumFont,
    marginBottom: scaleHeight(20),
    color: "#000",
  },
  answerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(15),
  },
  inputAnswer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#e41d69",
    borderRadius: scaleWidth(12),
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(15),
    fontFamily: "Poppins_500Medium",
    fontSize: mediumFont,
    color: "#000",
  },
  radioCircle: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    borderRadius: scaleWidth(12),
    borderWidth: 2,
    borderColor: "#e41d69",
    marginLeft: scaleWidth(10),
  },
  radioSelected: {
    backgroundColor: "#e41d69",
  },
  createButton: {
    backgroundColor: "#e41d69",
    borderRadius: scaleWidth(15),
    marginTop: scaleHeight(20),
    paddingVertical: scaleHeight(12),
    alignItems: "center",
  },
  createButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
    color: "#FFF",
  },
});

export default CreateQuestionStyles;
