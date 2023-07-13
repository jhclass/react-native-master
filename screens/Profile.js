import { View, Text, TouchableOpacity } from "react-native";
import { logoutFunc } from "../apollo";

const Profile = () => {
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
        <Text style={{ color: "#fff" }}>Someones Profiles</Text>
      </View>
    </View>
  );
};

export default Profile;
