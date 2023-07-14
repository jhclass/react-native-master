import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logoutFunc } from "../apollo";

const Search = ({ navigation }) => {
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
        <Text style={{ color: "#fff" }}>SEARCH!</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text style={{ color: "#fff" }}>Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
