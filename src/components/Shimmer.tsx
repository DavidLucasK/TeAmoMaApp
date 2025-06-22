import React, { useEffect, useRef } from "react";
import { Animated, View, StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ShimmerProps {
  style: StyleProp<ViewStyle>;
}

const Shimmer: React.FC<ShimmerProps> = ({ style }) => {
  const shimmerAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 300,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  return (
    <View style={[style, { overflow: "hidden", backgroundColor: "#e0e0e0" }]}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: 200,
          transform: [{ translateX: shimmerAnim }],
        }}
      >
        <LinearGradient
          colors={["#e0e0e0", "#f5f5f5", "#e0e0e0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
};

export default Shimmer;
