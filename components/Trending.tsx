import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import { Models } from "react-native-appwrite";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

type Props = {
  posts: Models.Document[];
};

type TrendingItemProps = {
  activeItem: string;
  item: Models.Document;
};

const zoomIn: any = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut: any = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  console.log(activeItem);
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      style={{ marginRight: 20 }}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          className="bg-white/10"
          source={{ uri: item.video }}
          style={{
            width: 208,
            height: 288,
            borderRadius: 35,
            marginTop: 12,
            backgroundColor: "grey",
            // reiszeMode: {ResizeMode.CONTAIN}
          }}
        />
      ) : (
        <TouchableOpacity
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={{
              width: 208,
              height: 288,
              borderRadius: 33,
              marginVertical: 20,
              overflow: "hidden",
            }}
            className="shadow-lg shadow-black/40"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            style={{ height: 48, width: 48, position: "absolute" }}
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: Props) => {
  const [activeItem, setActiveItem] = useState(posts[0].$id);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 9 }}
      onViewableItemsChanged={viewableItemsChanged}
      horizontal
    />
  );
};

export default Trending;
