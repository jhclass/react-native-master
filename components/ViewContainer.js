import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
export const ViewContainer = ({ loading, children }) => {
  return (
    <View
      style={{
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator color={"white"} size={"large"} />
      ) : (
        children
      )}
    </View>
  );
};
