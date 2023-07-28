import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logoutFunc } from "../apollo";

const Profile = ({ navigation, route }) => {
  console.log(navigation);
  console.log(route);
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route?.params?.username,
      });
    }
  }, [navigation, route]);

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
        <Text style={{ color: "#fff" }}>Someones Profiles</Text>
      </View>
    </View>
  );
};

export default Profile;
