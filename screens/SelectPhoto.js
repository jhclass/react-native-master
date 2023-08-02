import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;
const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;
export const SelectPhoto = () => {
  return (
    <Container>
      <Top />
      <Bottom />
    </Container>
  );
};
