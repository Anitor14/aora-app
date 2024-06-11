import { TouchableOpacity, Text, StyleSheet } from "react-native";

import React from "react";

type Props = {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: Props) => {
  const styles = StyleSheet.create({
    touchable: {
      backgroundColor: "#FF9C01",
      borderRadius: 12,
      minHeight: 62,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 28,
      opacity: isLoading ? 0.5 : 1,
      width: "100%",
    },
  });
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      //   className={`bg-secondary rounded-xl  min-h-[62px] justify-center items-center ${containerStyles} ${
      //     isLoading ? "opacity-50" : ""
      //   }`}
      style={styles.touchable}
      disabled={isLoading}
    >
      <Text
        className={`text-yellow-primary  font-psemibold text-lg ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
