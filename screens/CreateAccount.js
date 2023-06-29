import React, { useRef } from "react";
import styled, { css } from "styled-components/native";
import AuthLayout from "../components/auth/AuthLaytout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "react-native-gesture-handler";
import { Button, TouchableOpacity, Text } from "react-native";
import { colors } from "../colors";
import { Platform, KeyboardAvoidingView } from "react-native";

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
  const usernameRef = useRef();
  const passwordRef = useRef();
  const checkPasswordRef = useRef();
  const firstnameNameRef = useRef();
  const emailRef = useRef();

  const onNext = (nextOne) => {
    console.log("aa");
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert("done!");
  };
  return (
    <KeyboardAvoidingView
      style={{ width: "100%", flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 30}
    >
      <AuthLayout>
        <TextInputBox
          ref={usernameRef}
          first
          placeholder="아이디"
          placeholderTextColor="gray"
          returnKeyType="next"
          onSubmitEditing={() => onNext(passwordRef)}
        />
        <TextInputBox
          ref={passwordRef}
          placeholder="패스워드"
          placeholderTextColor="gray"
          returnKeyType="next"
          onSubmitEditing={() => onNext(checkPasswordRef)}
        />

        <TextInputBox
          placeholder="패스워드 확인"
          placeholderTextColor="gray"
          returnKeyType="next"
          ref={checkPasswordRef}
          onSubmitEditing={() => onNext(firstnameNameRef)}
        />

        <TextInputBox
          placeholder="이름 or 닉네임"
          placeholderTextColor="gray"
          returnKeyType="next"
          ref={firstnameNameRef}
          onSubmitEditing={() => onNext(emailRef)}
        />
        <TextInputBox
          last
          placeholder="이메일 (E-mail)"
          placeholderTextColor="gray"
          returnKeyType="done"
          keyboardType="email-address"
          ref={emailRef}
          onSubmitEditing={() => onDone}
          beghavior="padding"
        />

        <AuthEmailButton onPress={() => null}>
          <AuthEmailButtonText style={{ color: "#fff" }}>
            이메일 인증
          </AuthEmailButtonText>
        </AuthEmailButton>

        <AuthButton text="회원가입" disabled={true} onPress={() => null} />
      </AuthLayout>
    </KeyboardAvoidingView>
  );
};

export default CreateAccount;
