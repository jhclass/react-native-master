import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, useWindowDimensions } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { colors } from "../colors";
import { ActivityIndicator } from "react-native";
const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Photo = styled.Image`
  height: 100%;
`;
const CaptionContainer = styled.View`
  padding: 0 30px;
  margin-top: 20px;
`;
const Caption = styled.TextInput`
  background-color: #fff;
  color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #eee;
`;
const NextBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;
const NextBtnText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
`;

const PhotoContainer = styled.View`
  height: 400px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #222;
  overflow: hidden;
`;

const UploadPhoto = ({ route, navigation }) => {
  const HeaderRight = () => {
    return (
      <NextBtn
        onPress={() =>
          navigation.navigate("UploadPhoto", { file: chosenPhoto })
        }
      >
        <NextBtnText>다음</NextBtnText>
      </NextBtn>
    );
  };
  const HeaderRightLoading = () => (
    <ActivityIndicator size={"small"} color={colors.blue} />
  );
  const { register, handleSubmit, watch, setValue } = useForm();
  const { width } = useWindowDimensions();
  console.log(route, "Filename");
  //   console.log(navigation);
  useEffect(() => {
    register("caption");
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRightLoading,
    });
  }, []);
  return (
    <DismissKeyboard>
      <Container>
        <CaptionContainer>
          <Caption
            placeholder="오늘 나의 노력에 대한 소감을 작성하여주세요 🙏"
            placeholderTextColor="black"
            onChangeText={(text) => setValue("caption", text)}
          />
        </CaptionContainer>
        <PhotoContainer>
          <Photo source={{ uri: route.params.file }} resizeMode="contain" />
        </PhotoContainer>
      </Container>
    </DismissKeyboard>
  );
};
export default UploadPhoto;
