import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const clamp = (min: number, preferred: number, max: number) => {
  return Math.min(Math.max(preferred, min), max);
};

const scaleWidth = (value: number) => (screenWidth / 375) * value;
const scaleHeight = (value: number) => (screenHeight / 812) * value;

const smallFont = clamp(12, screenWidth * 0.035, 16);
const mediumFont = clamp(16, screenWidth * 0.045, 20);
const largeFont = clamp(20, screenWidth * 0.055, 28);

const PostsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  main: {
    flex: 1,
    paddingHorizontal: scaleWidth(10),
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  postsContainer: {
    width: "100%",
    paddingHorizontal: scaleWidth(15),
    paddingBottom: scaleHeight(10),
    marginBottom: scaleHeight(120),
    borderRadius: scaleWidth(20),
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  plusBtn: {
    height: scaleHeight(40),
    marginVertical: scaleHeight(25),
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  post: {
    marginTop: scaleHeight(24),
    alignSelf: "center",
  },
  user: {
    fontFamily: "Poppins_700Bold",
    fontSize: largeFont,
    color: "#ff0055",
    marginBottom: scaleHeight(-10),
  },
  usernameDesc: {
    fontFamily: "Poppins_700Bold",
    fontSize: mediumFont,
    color: "#ff0055",
  },
  imageContainer: {
    width: scaleWidth(285),
    height: scaleHeight(405),
    marginBottom: scaleHeight(16),
    backgroundColor: "#000",
    borderRadius: scaleWidth(10),
    overflow: "hidden",
  },
  imagePost: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  textBottom: {
    fontFamily: "Poppins_500Medium",
    fontSize: mediumFont,
    color: "#363636",
    textAlign: "left",
    maxWidth: scaleWidth(285),
    marginBottom: scaleHeight(5),
  },
  tempo: {
    fontFamily: "Poppins_500Medium",
    fontSize: smallFont,
    color: "#585858",
  },
  bordaBottom: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: scaleHeight(20),
  },
  noPostsText: {
    fontFamily: "Poppins_500Medium",
    fontSize: mediumFont,
    textAlign: "center",
    paddingTop: scaleHeight(200),
    paddingBottom: scaleHeight(300),
    color: "#585858",
  },
  usernameComments: {
    fontFamily: "Poppins_700Bold",
    fontSize: smallFont,
    color: "#ff0055",
  },
  commentContainer: {
    maxWidth: scaleWidth(285),
  },
  comments: {
    fontFamily: "Poppins_400Regular",
    fontSize: smallFont,
  },
  addComments: {
    fontFamily: "Poppins_500Medium",
    fontSize: mediumFont,
    color: "#afafaf",
    marginVertical: scaleHeight(12),
  },
  seeAllComments: {
    fontFamily: "Poppins_400Regular",
    fontSize: mediumFont,
    color: "#afafaf",
    marginVertical: scaleHeight(4),
  },
  publicarbtn: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: mediumFont,
    color: "#ff0055",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: scaleWidth(10),
    marginBottom: scaleHeight(10),
  },
  heartIcon: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    resizeMode: "contain",
  },
  commentIcon: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    resizeMode: "contain",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 99,
  },
});

export default PostsStyles;
