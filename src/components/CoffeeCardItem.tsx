import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { themeColors } from "../theme";
import { Entypo } from "@expo/vector-icons";

export default function CoffeeCardItem({ item }) {
  const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get("window");
  const CARD_WIDTH = SCREEN_W * 0.7;
  const CARD_HEIGHT = SCREEN_H * 0.55;

  return (
    <View
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      className="relative item-center overflow-visible justify-end"
    >
      <LinearGradient
        colors={[themeColors.bgPrimary, themeColors.bgSecondary]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          position: "absolute",
          bottom: 0,
          width: CARD_WIDTH,
          height: CARD_HEIGHT * 0.85,
          borderRadius: 40,
        }}
      />

      <Image
        source={item.image}
        className="absolute shadow-2xl top-0 ms-14"
        resizeMode="contain"
        style={{
          width: CARD_WIDTH * 0.6,
          height: CARD_HEIGHT * 0.6,
        }}
      />

      <View className="absolute bottom-2 w-full p-4 space-y-2">
        <Text className="text-3xl text-white font-semibold z-10">
          {item.name}
        </Text>

        <View className="bg-white/20 rounded-full mt-4 px-2 py-1 w-14 items-center">
          <Text className="text-sm text-white font-semibold">{item.stars}</Text>
        </View>

        <Text className="text-base mt-2 text-white opacity-70">
          Volume {item.volume}
        </Text>

        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-white text-lg font-semibold">
            $ {item.price}
          </Text>

          <TouchableOpacity className="w-12 h-12 rounded-full items-center justify-center">
            <Entypo name="circle-with-plus" size={42} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
