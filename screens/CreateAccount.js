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
const EmailAuthOkWrap = styled.View`
  width: 100%;
  margin-bottom: 20px;

  background-color: "#fff";
`;
const EmailAuthOkButton = styled.TouchableOpacity`
  padding: 13px 16px;
  background: ${colors.blue};

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-radius: 4px;
`;
const EmailAuthOkButtonText = styled.Text`
  color: #fff;
`;
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
const CHECK_NICK_MUTATION = gql`
  mutation ($nick: String!) {
    checkNick(nick: $nick) {
      ok
      message
    }
  }
`;
const CHECK_USERNAME_MUTATION = gql`
  mutation ($temporaryUser: String!) {
    checkUser(temporaryUser: $temporaryUser) {
      ok
      message
    }
  }
`;

const CHECK_EMAIL_MUTATION = gql`
  mutation emailAuth($emailAdd: String!) {
    authEmail(emailAdd: $emailAdd) {
      ok
      message
      code
    }
  }
`;

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
  const [checkNickMutation, { loading: checkNickLoading }] = useMutation(
    CHECK_NICK_MUTATION,
    {
      onCompleted: (data) => {
        //console.log(data);
        const {
          checkNick: { ok, message },
        } = data;
        alert(message);
        if (ok) {
          setCheckNick(ok);
        } else {
          setCheckNick(ok);
        }
      },
    }
  );

  const [checkUserMutation, { loading: checkUserLoading }] = useMutation(
    CHECK_USERNAME_MUTATION,
    {
      onCompleted: (data) => {
        //console.log(data);
        const {
          checkUser: { ok, message },
        } = data;
        alert(message);
        if (ok) {
          setCheckUsername(ok);
        } else {
          setCheckUsername(ok);
        }
      },
    }
  );
  const [checkEmailMutation, { loading: checkEmailLoading }] = useMutation(
    CHECK_EMAIL_MUTATION,
    {
      onCompleted: (data) => {
        console.log(data);
        const {
          authEmail: { code, ok, message },
        } = data;
        if (ok) {
          setCodeNum(code);
          // console.log(codeNum);
          alert(message);
        } else {
          alert(message);
        }
      },
    }
  );

  const checkEmailFunc = (value) => {
    if (value === undefined || value === null || value === "") {
      alert("이메일을 입력하여주세요.");
      return;
    }
    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegx.test(value)) {
      //console.log(value);
      checkEmailMutation({
        variables: {
          emailAdd: value,
        },
      });
    } else {
      alert("이메일이 정확하지 않습니다.");
      return;
    }
  };
  const checkNickFunc = (value) => {
    if (value === undefined || value === null || value === "") {
      alert("이름 또는 닉네임을 입력하여주세요.");
      return;
    }
    //console.log(value);
    checkNickMutation({
      variables: {
        nick: value,
      },
    });
  };

  const checkUserFunc = (value) => {
    if (value === undefined || value === null || value === "") {
      alert("아이디를 입력하여주세요.");
      return;
    }
    console.log(value);
    checkUserMutation({
      variables: {
        temporaryUser: value,
      },
    });
  };
  const [createAccountMutation, { loading, error }] = useMutation(
    CREATE_ACOUNT_MUTATION,
    {
      onCompleted: (data) => {
        console.log(data);
        const {
          createAccount: { ok, error },
        } = data;
        if (ok) {
          navigation.navigate("Login", {
            username: getValues("username"),
            password: getValues("password"),
          });
        }
      },
    }
  );
  const [codeNum, setCodeNum] = useState("");
  const [authEmail, setAuthEmail] = useState(false);
  const [checkNick, setCheckNick] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
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
    if (!authEmail) {
      alert("이메일 인증을 해주세요.");
      return;
    } else if (!checkNick) {
      alert("이름 or 닉네임 중복체크를 해주세요.");
      return;
    } else if (!checkUsername) {
      alert("아이디 중복체크를 해주세요.");
      return;
    }
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
  const compareEmailOk = (value) => {
    console.log(codeNum, value);
    if (String(codeNum) === value) {
      // 동일함.
      alert("인증이 완료되었습니다.");
      setAuthEmail(true);
    } else {
      alert("인증번호가 다릅니다. 다시 확인하여주세요.");
      setAuthEmail(false);
      return;
    }
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
  const firstNameRef = useRef();
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
        onSubmitEditing={() => checkUserFunc(getValues("username"))}
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
      <AuthNickButton onPress={() => checkUserFunc(getValues("username"))}>
        <AuthEmailButtonText style={{ color: "#fff" }}>
          중복체크
        </AuthEmailButtonText>
      </AuthNickButton>
      <TextInputBox
        ref={passwordRef}
        placeholder="패스워드"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        secureTextEntry={true}
        onSubmitEditing={onNext(() => checkPasswordRef)}
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
        onSubmitEditing={onNext(firstNameRef)}
        {...register("checkPassword", { required: true })}
        name="checkPassword"
        onChangeText={(text) => setValue("checkPassword", text)}
      />

      <TextInputBox
        placeholder="이름 or 닉네임"
        placeholderTextColor={"rgba(255,255,255,0.8)"}
        returnKeyType="next"
        ref={firstNameRef}
        onSubmitEditing={() => checkNickFunc(getValues("firstName"))}
        {...register("firstName", { required: true })}
        name="firstName"
        onChangeText={(text) => setValue("firstName", text)}
      />
      {errors?.firstName && (
        <ErrMessage style={{ color: "red" }}>
          {errors.firstName.message}
        </ErrMessage>
      )}
      <AuthNickButton onPress={() => checkNickFunc(getValues("firstName"))}>
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
        onSubmitEditing={() => checkEmailFunc(getValues("checkEmail"))}
        onChangeText={(text) => setValue("checkEmail", text)}
      />
      {errors?.checkEmail && (
        <ErrMessage style={{ color: "red" }}>
          {errors.checkEmail.message}
        </ErrMessage>
      )}

      <AuthEmailButton onPress={() => checkEmailFunc(getValues("checkEmail"))}>
        <AuthEmailButtonText style={{ color: "#fff" }}>
          이메일 인증번호 발송
        </AuthEmailButtonText>
      </AuthEmailButton>
      <EmailAuthOkWrap>
        <TextInputBox
          placeholder="인증번호 입력"
          placeholderTextColor={"rgba(255,255,255,0.8)"}
          returnKeyType="done"
          keyboardType="numeric"
          ref={emailRef}
          {...register("sendNumber", { required: true })}
          name="sendNumber"
          // onSubmitEditing={() => onDone}
          onChangeText={(text) => setValue("sendNumber", text)}
        />
        <EmailAuthOkButton
          onPress={() => compareEmailOk(getValues("sendNumber"))}
        >
          <EmailAuthOkButtonText>확인</EmailAuthOkButtonText>
        </EmailAuthOkButton>
      </EmailAuthOkWrap>

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
