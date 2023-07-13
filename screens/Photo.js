import { View, Text, TouchableOpacity } from "react-native";

import { tokenVar, isLoggedInVar, logoutFunc } from "../apollo";

const Photo = ({ navigation }) => {
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
        <Text style={{ color: "#fff" }}>SEARCH</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Text style={{ color: "#fff" }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Photo;
