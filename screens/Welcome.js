import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
const Welcome = ({ navigation }) => {
  //console.log(props);
  return (
    <View>
      <Text>Welcome!</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to CreateAccount</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View>
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
