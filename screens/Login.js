import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => navigation.navigate("createAccount")}>
        <View>
          <Text>Go to CreateAccount</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
