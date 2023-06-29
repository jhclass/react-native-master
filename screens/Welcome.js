import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthLayout from "../components/auth/AuthLaytout";
import AuthButton from "../components/auth/AuthButton";

// web 과의 차이점 font속성의 상속
const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  font-size: 16px;
`;

const Welcome = ({ navigation }) => {
  //console.log(props);
  const goToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };
  const goToLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <AuthLayout>
      <AuthButton
        text="Create an account"
        disabled={false}
        onPress={goToCreateAccount}
      />

      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default Welcome;
