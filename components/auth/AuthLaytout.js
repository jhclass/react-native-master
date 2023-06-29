import React from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
`;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, backgroundColor: "#000" }}
      onPress={() => {
        //alert("a");
        Keyboard.dismiss();
      }}
    >
      <Container>
        <Logo
          resizeMode="contain"
          source={require("../../assets/logo_color.png")}
        />
        {children}
      </Container>
    </TouchableWithoutFeedback>
  );
}
