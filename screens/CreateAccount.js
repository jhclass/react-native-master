import React, { useRef, useEffect, useState } from "react";
import AuthLayout from "../components/auth/AuthLaytout";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { colors } from "../colors";
import {
  TextInputBox,
  AuthEmailButtonText,
  AuthEmailButton,
  AuthNickButton,
} from "../components/auth/AuthShared";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const CREATE_ACOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const ErrMessage = styled.Text`
  color: ${colors.red};
  font-size: 12px;
  margin-bottom: 10px;
`;
const CreateAccount = ({ navigation }) => {
  const [createAccountMutation, { loading, error }] = useMutation(
    CREATE_ACOUNT_MUTATION,
    {
      onCompleted: (data) => {
        console.log(data);
        const {
          createAccount: { ok, error },
        } = data;
        if (ok) {
          //회원가입 완료
          // const goToCreateAccount = () => {
          //   navigation.navigate("CreateAccount");
          // };
          // 추후 회원가입 이동페이지로 이동
          // 현재는 로그인으로 이동.
          navigation.navigate("Login", {
            username: getValues("username"),
            password: getValues("password"),
          });

          //로그인
        }
      },
    }
  );
  const [authEmail, setAuthEmail] = useState(false);
  const [authNick, setAuthNick] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onValid2 = (data) => {
    //alert("a");
    console.log(data);
    createAccountMutation({
      variables: {
        firstName: data.firstName,
        username: data.username,
        email: data.checkEmail,
        password: data.password,
      },
    });
  };
  useEffect(() => {
    // alert("a");
    register("username", {
      required: true,
      pattern: {
        value: /^[a-z0-9]+$/i,
        message: "영어소문자+숫자의 조합으로 만들어주세요.",
      },
    });
    register("password", {
      required: true,
      pattern: {
        value: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]+$/,
        message: "적어도 한개의 특수문자와 숫자, 영어 소문자를 포함해야합니다.",
      },
      minLength: {
        value: 6,
        message: "비밀번호는 6자 이상이어야합니다.",
      },
    });
    register("checkPassword", { required: true });
    register("firstName", {
      required: "이름 또는 별명을 입력하세요.",
      minLength: {
        value: 2,
        message: "이름 또는 별명을 입력하세요.",
      },
      pattern: {
        value: /^[a-zA-Z0-9가-힣]+$/,
        message: "특수문자는 사용할 수 없습니다.",
      },
    });
    register("checkEmail", {
      required: "이메일을 입력하여주세요.",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "이메일 형식이 잘못되었습니다.",
      },
    });
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
      {errors?.username && (
        <ErrMessage style={{ color: "red" }}>
          {errors.username.message}
        </ErrMessage>
      )}
      <TextInputBox
        ref={passwordRef}
        placeholder="패스워드"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        secureTextEntry={true}
        onSubmitEditing={() => onNext(checkPasswordRef)}
        onChangeText={(text) => setValue("password", text)}
      />
      {errors?.password && (
        <ErrMessage style={{ color: "red" }}>
          {errors.password.message}
        </ErrMessage>
      )}
      <TextInputBox
        placeholder="패스워드 확인"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        secureTextEntry={true}
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
      {errors?.firstName && (
        <ErrMessage style={{ color: "red" }}>
          {errors.firstName.message}
        </ErrMessage>
      )}
      <AuthNickButton onPress={() => null}>
        <AuthEmailButtonText style={{ color: "#fff" }}>
          중복체크
        </AuthEmailButtonText>
      </AuthNickButton>
      <TextInputBox
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
      {errors?.checkEmail && (
        <ErrMessage style={{ color: "red" }}>
          {errors.checkEmail.message}
        </ErrMessage>
      )}
      <AuthEmailButton onPress={() => null}>
        <AuthEmailButtonText style={{ color: "#fff" }}>
          이메일 인증
        </AuthEmailButtonText>
      </AuthEmailButton>

      <AuthButton
        text="회원가입"
        disabled={
          !watch("username") ||
          !watch("password") ||
          !watch("checkPassword") ||
          !watch("firstName") ||
          !watch("checkEmail")
        }
        loading={loading}
        onPress={handleSubmit(onValid2)}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
