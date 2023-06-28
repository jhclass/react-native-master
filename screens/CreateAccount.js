import React from "react";
import styled, { css } from "styled-components/native";
import AuthLayout from "../components/auth/AuthLaytout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "react-native-gesture-handler";
import { Button, TouchableOpacity, Text } from "react-native";
import { colors } from "../colors";

const AuthEmailButton = styled.TouchableOpacity`
  margin-bottom: 40px;
  width: 100%;
  padding: 10px 0;
  background-color: ${colors.red};
  border-radius: 4px;
`;
const AuthEmailButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`;
const TextInputBox = styled.TextInput`
  background-color: #fff;
  width: 100%;
  padding: 15px 13px;
  font-size: 16px;
  border-radius: 4px;
  margin-bottom: 20px;

  ${(props) =>
    props.first &&
    css`
      margin-top: 20px;
    `}

  ${(props) =>
    props.last &&
    css`
      margin-bottom: 10px;
    `}
`;
const CreateAccount = () => {
  return (
    <AuthLayout>
      <TextInputBox
        first
        placeholder="아이디"
        placeholderTextColor="gray"
        returnKeyType="next"
      />
      <TextInputBox
        placeholder="패스워드"
        placeholderTextColor="gray"
        returnKeyType="다음"
      />

      <TextInputBox
        placeholder="패스워드 확인"
        placeholderTextColor="gray"
        returnKeyType="다음"
      />

      <TextInputBox
        placeholder="이름 or 닉네임"
        placeholderTextColor="gray"
        returnKeyType="다음"
      />
      <TextInputBox
        last
        placeholder="이메일 (E-mail)"
        placeholderTextColor="gray"
        returnKeyType="완료"
        keyboardType="email-address"
      />

      <AuthEmailButton onPress={() => null}>
        <AuthEmailButtonText style={{ color: "#fff" }}>
          이메일 인증
        </AuthEmailButtonText>
      </AuthEmailButton>

      <AuthButton text="회원가입" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
};

export default CreateAccount;
