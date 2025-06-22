import { StyleSheet } from "react-native";

const FooterStyles = StyleSheet.create({
  footer: {
    display: "flex",
  },
  footerContainer: {
    justifyContent: "center",
    paddingVertical: 10,
  },
  icons: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default FooterStyles;
