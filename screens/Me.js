import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logoutFunc } from "../apollo";
import styled from "styled-components/native";
import { useQuery, gql } from "@apollo/client";
import { colors } from "../colors";

const ME_QUERY = gql`
  query {
    me {
      id
      username
    }
  }
`;

const Wrapper = styled.View``;
const MeContainer = styled.View``;
const Me = ({ navigation }) => {
  console.log(navigation);
  const { data: meQuery, loading: meLoading } = useQuery(ME_QUERY);
  console.log(meQuery);
  useEffect(() => {
    navigation.setOptions({
      title: meQuery?.me?.username,
    });
  }, [meQuery, navigation]);
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
        <Text style={{ color: "#fff" }}>
          안녕 나는 {meQuery?.me?.username} 이야..!(임시)
        </Text>
        <TouchableOpacity onPress={logoutFunc} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.blue }}>로그아웃</Text>
        </TouchableOpacity>
      </MeContainer>
    </Wrapper>
  );
};

export default Me;
