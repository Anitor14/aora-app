import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import Trending from "@/components/Trending";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import SearchInput from "@/components/SearchInput";
import { images } from "@/constants";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: posts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: getAllPosts,
  });

  if (error) {
    Alert.alert("Error", error.message);
  }

  const { data: latestPost, error: latestPostError } = useQuery({
    queryKey: ["latestVideos"],
    queryFn: getLatestPosts,
  });

  if (latestPostError) {
    Alert.alert("Error", latestPostError.message);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: 24,
                alignItems: "flex-start",
              }}
            >
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Anitor Tube
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  style={{ width: 36, height: 40 }}
                  source={images.logoSmall}
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPost ? latestPost : []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
