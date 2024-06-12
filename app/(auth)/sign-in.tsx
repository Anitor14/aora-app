import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import useUserStore from "@/stores/userStore";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";

const SignIn = () => {
  const { setUser, setIsLogged } = useUserStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { mutate: handleSignIn, isPending: isSubmitting } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      setUser(data);
      setIsLogged(true);
      router.replace("/home");
    },

    onError: (error: Error) => {
      Alert.alert("Error", error.message);
    },
  });

  const submit = () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "please fill in all fields");
    } else {
      handleSignIn({
        email: form.email,
        password: form.password,
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title={"Email"}
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title={"Password"}
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href={"/sign-up"}
              style={{
                fontSize: 18,
                color: "#FF9C01",
                fontFamily: "Poppins-SemiBold, sans-serif",
              }}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
