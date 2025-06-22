import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp, RootStackParamList } from "../navigation";
import FooterStyles from "../styles/FooterStyles";

interface FooterIcon {
  icon: any;
  screen?: keyof RootStackParamList;
  onPress?: () => void;
}

const Footer: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  const icons: FooterIcon[] = [
    {
      icon: require("../screens/assets/home.png"),
      screen: "Home",
    },
    {
      icon: require("../screens/assets/posts.png"),
      screen: "Posts",
    },
    {
      icon: require("../screens/assets/plusWhite.png"),
      screen: "CreatePost",
    },
    {
      icon: require("../screens/assets/game.png"),
      screen: "EarnPoints",
    },
    {
      icon: require("../screens/assets/store.png"),
      screen: "Store",
    },
  ];

  const handleIconPress = (icon: FooterIcon) => {
    if (icon.onPress) {
      icon.onPress();
    } else if (icon.screen) {
      if (icon.screen === "Home") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        navigation.navigate(icon.screen as any);
      }
    }
  };

  return (
    <LinearGradient
      colors={["#e41d69", "#fe8277"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={FooterStyles.footer}
    >
      <View style={FooterStyles.footerContainer}>
        <View style={FooterStyles.icons}>
          {icons.map((iconItem, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleIconPress(iconItem)}
            >
              <Image source={iconItem.icon} style={FooterStyles.icon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

export default Footer;
