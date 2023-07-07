import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tokenVar, isLoggedInVar } from "../apollo";

const logoutFunc = async () => {
  console.log("aaaa");
  const keys = ["token", "loggedIn"];
  await AsyncStorage.multiRemove(keys);
  tokenVar("");
  isLoggedInVar(false);
};
const Likes = () => {
  return (
    <View
      style={{
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => logoutFunc()}>
        <Text style={{ color: "#fff" }}>로그아웃</Text>
      </TouchableOpacity>
      <View>
        <Text style={{ color: "#fff" }}>Likes</Text>
      </View>
    </View>
  );
};

export default Likes;
