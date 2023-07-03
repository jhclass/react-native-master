import React, { useEffect, useRef } from "react";

import AuthLayout from "../components/auth/AuthLaytout";
import AuthButton from "../components/auth/AuthButton";
import { TextInputBox } from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const LOG_IN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

const Login = () => {
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
      }
    },
  });
  //console.log(data);
  // if (loading) return <p>로딩중...</p>;
  // if (error) return <p>로그인에 실패했습니다.</p>;
  // if (!data) return <p>로그인에 실패했습니다.</p>;
  // console.log(data.login);
  // console.log(data.login.ok);
  // console.log(data.login.error);
  // console.log(data.login.token);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
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
      <TextInputBox
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
        lastButton
        ref={passwordRef}
        placeholder="패스워드"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onVaild)}
        onChangeText={(text) => setValue("password", text)}
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
