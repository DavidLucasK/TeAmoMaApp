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

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: scaleWidth(20),
    backgroundColor: "#fff",
  },
  logo: {
    width: scaleWidth(80),
    height: scaleWidth(80),
    resizeMode: "contain",
    alignSelf: "center",
  },
  heading: {
    fontSize: largeFont,
    fontFamily: "Poppins_600SemiBold",
    marginVertical: scaleHeight(20),
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  field: {
    marginBottom: scaleHeight(15),
  },
  input: {
    height: scaleHeight(50),
    fontFamily: "Poppins_500Medium",
    borderColor: "#ccc",
    borderWidth: 1,
    textAlign: "left",
    borderRadius: scaleWidth(10),
    paddingHorizontal: scaleWidth(15),
    fontSize: smallFont,
  },
  togglePassword: {
    color: "#ff0055",
    textAlign: "right",
    marginBottom: scaleHeight(20),
    fontFamily: "Poppins_600SemiBold",
    fontSize: smallFont,
  },
  button: {
    backgroundColor: "#ff0055",
    paddingVertical: scaleHeight(15),
    borderRadius: scaleWidth(10),
    alignItems: "center",
    marginBottom: scaleHeight(20),
  },
  buttonText: {
    color: "#fff",
    fontSize: mediumFont,
    fontFamily: "Poppins_600SemiBold",
  },
  textForget: {
    color: "#ff0055",
    textAlign: "center",
    marginBottom: scaleHeight(20),
    fontFamily: "Poppins_500Medium",
    fontSize: smallFont,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(20),
  },
  rememberMeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: smallFont,
  },
  createAccount: {
    alignItems: "center",
  },
  createAccountText: {
    color: "#ff0055",
    fontFamily: "Poppins_600SemiBold",
    fontSize: mediumFont,
  },
  result: {
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    marginTop: scaleHeight(20),
    fontSize: mediumFont,
  },
});

export default LoginStyles;
