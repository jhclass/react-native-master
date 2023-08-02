import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logoutFunc } from "../apollo";

const Notification = () => {
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
        <Text style={{ color: "#fff" }}>Notification</Text>
      </View>
    </View>
  );
};

export default Notification;
