import React, { useRef } from "react";
import AuthLayout from "../components/auth/AuthLaytout";
import AuthButton from "../components/auth/AuthButton";
import {
  TextInputBox,
  AuthEmailButtonText,
  AuthEmailButton,
} from "../components/auth/AuthShared";

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
    <AuthLayout>
      <TextInputBox
        ref={usernameRef}
        first
        placeholder="아이디"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <TextInputBox
        ref={passwordRef}
        placeholder="패스워드"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(checkPasswordRef)}
      />

      <TextInputBox
        placeholder="패스워드 확인"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        ref={checkPasswordRef}
        onSubmitEditing={() => onNext(firstnameNameRef)}
      />

      <TextInputBox
        placeholder="이름 or 닉네임"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        ref={firstnameNameRef}
        onSubmitEditing={() => onNext(emailRef)}
      />
      <TextInputBox
        last
        placeholder="이메일 (E-mail)"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
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
  );
};

export default CreateAccount;
