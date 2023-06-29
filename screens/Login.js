import React, { useEffect, useRef } from "react";

import AuthLayout from "../components/auth/AuthLaytout";
import AuthButton from "../components/auth/AuthButton";
import { TextInputBox } from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const onVaild = (data) => {
    console.log(data);
  };
  //console.log(watch());
  useEffect(() => {
    register("username");
    register("password");
  }, [register]);

  const usernameRef = useRef();
  const passwordRef = useRef();
  console.log(passwordRef);
  const onNext = (nextOne) => {
    //console.log("aa");
    nextOne?.current?.focus();
  };
  const onDone = () => {
    //alert("done!");
  };
  return (
    <AuthLayout>
      <TextInputBox
        ref={usernameRef}
        first
        {...register("username", { required: true })}
        name="username"
        placeholder="아이디"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
        autoCapitalize="none"
      />
      <TextInputBox
        lastButton
        ref={passwordRef}
        {...register("password", { required: true })}
        placeholder="패스워드"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onVaild)}
        onChangeText={(text) => setValue("password", text)}
      />

      <AuthButton
        text="로그인"
        // disabled={true}
        onPress={handleSubmit(onVaild)}
      />
    </AuthLayout>
  );
};

export default Login;
