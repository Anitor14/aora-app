import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type Props = {
  value: string;
  keyboardType?: string;
  handleChangeText: (e: any) => void;
  otherStyles: string;
};

const SearchInput = ({
  value,
  keyboardType,
  handleChangeText,
  otherStyles,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl flex-row focus:border-secondary items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity>
        <Image
          style={{ width: 20, height: 20 }}
          source={icons.search}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
