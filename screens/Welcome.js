import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";
const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 150px;
`;

const CreateAccount = styled.View`
  background-color: ${colors.blue};
  padding: 10px 15px;
  border-radius: 4px;
`;

const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

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
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo_color.png")} />
      <TouchableOpacity>
        <CreateAccount>
          <CreateAccountText onPress={goToCreateAccount}>
            Create Account
          </CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity>
        <LoginLink onPress={goToLogin}>Log in</LoginLink>
      </TouchableOpacity>
    </Container>
  );
};

export default Welcome;
