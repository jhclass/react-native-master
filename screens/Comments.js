import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Comments = () => {
  return (
    <View
      style={{
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ color: "#fff" }}>Likes</Text>
      </View>
    </View>
  );
};

export default Comments;
