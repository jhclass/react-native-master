import React, { useRef, useEffect } from "react";
import AuthLayout from "../components/auth/AuthLaytout";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";
import {
  TextInputBox,
  AuthEmailButtonText,
  AuthEmailButton,
} from "../components/auth/AuthShared";

const CreateAccount = () => {
  const { register, handleSubmit, watch, setValue } = useForm();

  const onValid2 = (data) => {
    //alert("a");
    console.log(data);
  };
  useEffect(() => {
    // alert("a");
    register("username");
    register("password");
    register("checkPassword");
    register("firstName");
    register("checkEmail");
  }, [register]);
  //console.log(watch());
  const usernameRef = useRef();
  const passwordRef = useRef();
  const checkPasswordRef = useRef();
  const firstnameNameRef = useRef();
  const emailRef = useRef();

  const onNext = (nextOne) => {
    //console.log("aa");
    nextOne?.current?.focus();
  };
  // const onDone = () => {
  //   alert("done!");
  // };
  return (
    <AuthLayout>
      <TextInputBox
        ref={usernameRef}
        first
        placeholder="아이디"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        autoCapitalize="none"
        {...register("username", { required: true })}
        name="username"
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInputBox
        ref={passwordRef}
        placeholder="패스워드"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(checkPasswordRef)}
        {...register("password", { required: true })}
        name="password"
        onChangeText={(text) => setValue("password", text)}
      />

      <TextInputBox
        placeholder="패스워드 확인"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        ref={checkPasswordRef}
        onSubmitEditing={() => onNext(firstnameNameRef)}
        {...register("checkPassword", { required: true })}
        name="checkPassword"
        onChangeText={(text) => setValue("checkPassword", text)}
      />

      <TextInputBox
        placeholder="이름 or 닉네임"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        ref={firstnameNameRef}
        onSubmitEditing={() => onNext(emailRef)}
        {...register("firstName", { required: true })}
        name="firstName"
        onChangeText={(text) => setValue("firstName", text)}
      />
      <TextInputBox
        last
        placeholder="이메일 (E-mail)"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="done"
        keyboardType="email-address"
        ref={emailRef}
        {...register("checkEmail", { required: true })}
        name="checkEmail"
        // onSubmitEditing={() => onDone}
        onChangeText={(text) => setValue("checkEmail", text)}
      />

      <AuthEmailButton onPress={() => null}>
        <AuthEmailButtonText style={{ color: "#fff" }}>
          이메일 인증
        </AuthEmailButtonText>
      </AuthEmailButton>

      <AuthButton
        text="회원가입"
        disabled={false}
        onPress={handleSubmit(onValid2)}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
