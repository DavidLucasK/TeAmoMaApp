import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

// Função que simula um clamp
const clamp = (min: number, preferred: number, max: number) => {
  return Math.min(Math.max(preferred, min), max);
};

const avatarSize = clamp(150, screenWidth * 0.6, 350);
const horizontalPadding = 20;
const responsiveFontSize = clamp(16, screenWidth * 0.05, 24);

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  home: {
    flex: 1,
    width: screenWidth,
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  textos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalPadding * 2,
    width: "100%",
  },
  homeText: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontSize: responsiveFontSize,
    color: "#fff",
    lineHeight: responsiveFontSize * 1.4,
  },
  imagesHome: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#ffffffa0",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
  },
  avatarImage: {
    width: avatarSize,
    height: avatarSize,
  },
});

export default HomeStyles;
