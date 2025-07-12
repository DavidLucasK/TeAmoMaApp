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

const EditQuizStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  main: {
    flex: 1,
  },
  loadingContainer: {},
  scrollContainer: {
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(20),
    paddingBottom: scaleHeight(20), // espaço para o Footer não sobrepor
  },
  title: {
    fontSize: xLargeFont,
    fontFamily: "Poppins_700Bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: scaleHeight(20),
  },
  createButton: {
    backgroundColor: "#ff758f",
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(10),
    alignSelf: "center",
    marginBottom: scaleHeight(20),
  },
  createButtonText: {
    fontSize: mediumFont,
    fontFamily: "Poppins_700Bold",
    color: "#FFF",
  },
  totalQuestions: {
    fontSize: largeFont,
    fontFamily: "Poppins_700Bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: scaleHeight(20),
  },
  questionsContainer: {
    gap: scaleHeight(15),
  },
  questionCard: {
    backgroundColor: "#FFF",
    borderRadius: scaleWidth(15),
    padding: scaleWidth(15),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: mediumFont / 1.2,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    marginVertical: scaleHeight(20),
    textAlign: "center",
  },
  questionActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: scaleWidth(10),
  },
  icon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.459)", // Fundo do modal
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#343a40",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalConfirmationContent: {
    width: "100%",
    height: "90%",
    marginTop: 120,
    backgroundColor: "#343a40",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
    color: "#FFF",
    textAlign: "center",
  },
  modalTitleTime: {
    fontSize: 28,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
    color: "#FFF",
    textAlign: "center",
  },
  modalSubTitle: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    marginBottom: 20,
    color: "#FFF",
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonCancel: {
    backgroundColor: "#606c77",
    fontFamily: "Poppins_600SemiBold",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  buttonConfirm: {
    backgroundColor: "#e41d69",
    fontFamily: "Poppins_600SemiBold",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  buttonText1: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
});

export default EditQuizStyles;
