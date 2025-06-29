import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp, RootStackParamList } from "../navigation";
import HeaderStyles from "../styles/HeaderStyles";

interface HeaderIcon {
  icon: any;
  screen?: keyof RootStackParamList;
  onPress?: () => void;
}

interface HeaderProps {
  icons: HeaderIcon[];
  back?: boolean; // Torna opcional
}

const Header: React.FC<HeaderProps> = ({ icons, back }) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleIconPress = (icon: HeaderIcon) => {
    if (icon.onPress) {
      icon.onPress();
    } else if (icon.screen) {
      navigation.navigate(icon.screen as any);
    }
  };

  const handleLogoPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={["#e41d69", "#fe8277"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={HeaderStyles.header}
    >
      <View style={HeaderStyles.headerContent}>
        {back ? (
          <View style={HeaderStyles.headerContent}>
            <TouchableOpacity onPress={handleLogoPress}>
              <Text style={HeaderStyles.logo}>LoveYou</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGoBack}>
              <Text style={HeaderStyles.backText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={handleLogoPress}>
              <Text style={HeaderStyles.logo}>LoveYou</Text>
            </TouchableOpacity>
          </View>
        )}

        {!back && (
          <View style={HeaderStyles.icons}>
            {icons.map((iconItem, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleIconPress(iconItem)}
              >
                <Image source={iconItem.icon} style={HeaderStyles.icon} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default Header;
