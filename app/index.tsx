import { Text, View, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import useGetUser from "@/hooks/useGetUser";
import { images } from "@/constants";
import { Redirect, router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const index = () => {
  const { user } = useGetUser();
  if (user) return <Redirect href={"/home"} />;
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#161622" }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[84px] w-[130px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="max-w-[380px] w-full h-[300px]"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation:embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default index;
