import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logoutFunc } from "../apollo";
import styled from "styled-components/native";
const Wrapper = styled.View``;
const MeContainer = styled.View``;
const Me = () => {
  return (
    <Wrapper
      style={{
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MeContainer>
        <Text style={{ color: "#fff" }}>Its Me!</Text>
      </MeContainer>
    </Wrapper>
  );
};

export default Me;
