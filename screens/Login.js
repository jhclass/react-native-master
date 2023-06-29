import React, { useRef } from "react";

import AuthLayout from "../components/auth/AuthLaytout";
import AuthButton from "../components/auth/AuthButton";
import { TextInputBox } from "../components/auth/AuthShared";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

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
        lastButton
        ref={passwordRef}
        placeholder="패스워드"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="done"
        onSubmitEditing={() => onDone}
      />

      <AuthButton text="로그인" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
};

export default Login;
