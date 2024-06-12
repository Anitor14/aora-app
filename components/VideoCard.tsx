import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { Models } from "react-native-appwrite";
import { icons } from "@/constants";

type Props = {
  video: Models.Document;
};

const VideoCard = ({ video }: Props) => {
  const {
    title,
    thumbnail,
    video: videoContent,
    users: { avatar, username },
  } = video;

  const [play, setPlay] = useState(false);

  return (
    <View
      style={{
        marginBottom: 56,
        display: "flex",
        flexDirection: "column",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              borderWidth: 1,
              borderColor: "#FF9C01",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
              source={{ uri: avatar }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flex: 1,
              rowGap: 4,
              marginLeft: 12,
            }}
          >
            <Text
              className="text-white  font-semibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-gray-100 font-pregular text-xs">
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image
            source={icons.menu}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      {play ? (
        <Video
          style={{
            width: "100%",
            height: 240,
            borderRadius: 12,
            marginTop: 12,
          }}
          source={{ uri: videoContent }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          //   shouldPlay
          //   onPlaybackStatusUpdate={(status) => {
          //     if (status) {
          //       setPlay(false);
          //     }
          //   }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="rounded-xl"
          style={{
            width: "100%",
            height: 240,
            borderRadius: 12,
            marginTop: 12,
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            className="rounded-xl"
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
            resizeMode="cover"
            source={{ uri: thumbnail }}
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
