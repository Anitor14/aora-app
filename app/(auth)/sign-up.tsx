import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@/stores/userStore";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const { setUser, setIsLogged } = useUserStore();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { mutate: handleSignUp, isPending: isSubmitting } = useMutation({
    mutationFn: createUser,
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
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "please fill in all fields");
    } else {
      handleSignUp({
        username: form.username,
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
            Sign up to Aora
          </Text>
          <FormField
            title={"Username"}
            value={form.username}
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
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
            title="Sign Up"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href={"/sign-in"}
              style={{
                fontSize: 18,
                color: "#FF9C01",
                fontFamily: "Poppins-SemiBold, sans-serif",
              }}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
