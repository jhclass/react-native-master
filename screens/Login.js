import React, { useEffect, useRef, useState } from "react";

import AuthLayout from "../components/auth/AuthLaytout";
import AuthButton from "../components/auth/AuthButton";
import { TextInputBox } from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import { View, Text } from "react-native";

const LOG_IN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

const Login = ({ route }) => {
  console.log(route);
  const [loginError, setLoginError] = useState("");
  const [logInMutation, { loading }] = useMutation(LOG_IN_MUTATION, {
    onCompleted: (data) => {
      console.log(data, "데이터");
      const {
        login: { ok, error },
      } = data;
      // if (ok) {
      //   localStorage.setItem("token", data.login.token);
      // } else {
      //   alert(error);
      // }
      console.log(ok);
      if (ok) {
        isLoggedInVar(true);
      } else {
        setLoginError("아이디 또는 비밀번호를 다시 확인하여주세요.");
      }
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: route?.params?.username || null,
      password: route?.params?.password || null,
    },
  });

  const onVaild = (data) => {
    console.log(data);
    if (!loading) {
      logInMutation({
        variables: {
          username: data.username,
          password: data.password,
          //...data,
        },
      });
    }
  };
  //console.log(watch());
  useEffect(() => {
    register("username", { required: "아이디를 다시 입력하여주세요." });
    register("password", { required: "비밀번호를 다시 입력하여주세요." });
  }, [register]);

  const usernameRef = useRef();
  const passwordRef = useRef();
  //console.log(passwordRef);
  const onNext = (nextOne) => {
    //console.log("aa");
    nextOne?.current?.focus();
  };
  const onDone = () => {
    //alert("done!");
  };
  return (
    <AuthLayout>
      {loginError ? (
        <View>
          <Text style={{ color: "#fff" }}>{loginError}</Text>
        </View>
      ) : null}
      <TextInputBox
        value={watch("username")}
        ref={usernameRef}
        first
        placeholder="아이디"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
        autoCapitalize="none"
      />
      <TextInputBox
        value={watch("password")}
        lastButton
        ref={passwordRef}
        placeholder="패스워드"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onVaild)}
        onChangeText={(text) => setValue("password", text)}
        secureTextEntry={true}
      />

      <AuthButton
        text="로그인"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onVaild)}
      />
    </AuthLayout>
  );
};

export default Login;
