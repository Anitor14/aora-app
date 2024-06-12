import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

type Props = {
  title: string;
  subtitle: string;
};

const EmptyState = ({ title, subtitle }: Props) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        style={{ width: 270, height: 216 }}
        resizeMode="contain"
        source={images.empty}
      />
      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>
      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;