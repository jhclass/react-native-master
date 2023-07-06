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
const Feed = () => {
  return (
    <View>
      <View>
        <Text>Feed</Text>
      </View>
      <View>
        <Text>Feed</Text>
      </View>
      <View>
        <Text>Feed</Text>
      </View>
      <View>
        <Text>Feed</Text>
      </View>
      <View>
        <Text>Feed</Text>
      </View>
      <TouchableOpacity onPress={() => logoutFunc()}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feed;
