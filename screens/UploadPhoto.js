import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, useWindowDimensions } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { colors } from "../colors";
import { ActivityIndicator } from "react-native";
import { gql } from "@apollo/client";
import { FEED_PHOTO } from "../fragments";
import { useMutation } from "@apollo/client";
import { ReactNativeFile, createUploadLink } from "apollo-upload-client";
const UPLOAD_PHOTO_MUTATION = gql`
  mutation ($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      createdAt
      user {
        id
        username
      }
      file
      caption
      id
    }
  }
`;
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
  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: (cache, result) => {
        const {
          data: { uploadPhoto },
        } = result;
        console.log(uploadPhoto.id, "결과값으로는 뭐가있을까?");
        if (uploadPhoto.id) {
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              seeFeed(prev) {
                const newFeed = [uploadPhoto, ...prev];
                return newFeed;
              },
            },
          });
          navigation.navigate("Tabs");
        }
      },
    }
  );
  const HeaderRight = () => {
    return (
      <NextBtn onPress={handleSubmit(onValid)}>
        <NextBtnText>다음</NextBtnText>
      </NextBtn>
    );
  };
  const HeaderRightLoading = () => (
    <ActivityIndicator size={"small"} color={colors.blue} />
  );
  const { register, handleSubmit, watch, setValue } = useForm();
  const { width } = useWindowDimensions();
  console.log(route.params.file2, "Filename");
  console.log(navigation, "네비게이션", route, "라우트");
  useEffect(() => {
    register("caption");
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
    });
  }, [loading]);
  const onValid = ({ caption }) => {
    try {
      const file = new ReactNativeFile({
        uri: route.params.file2,
        name: "ghs.jpg",
        type: "image/jpeg",
      });
      console.log(file);
      uploadPhotoMutation({
        variables: {
          caption: caption,
          file: file,
        },
      });
    } catch (e) {
      console.error("Error uploading file:", e); // 변수 이름 수정
    }
  };
  return (
    <DismissKeyboard>
      <Container>
        <CaptionContainer>
          <Caption
            placeholder="오늘 나의 노력에 대한 소감을 작성하여주세요 🙏"
            placeholderTextColor="rgba(0,0,0,0.5)"
            onChangeText={(text) => setValue("caption", text)}
            onSubmitEditing={handleSubmit(onValid)}
          />
        </CaptionContainer>
        <PhotoContainer>
          <Photo source={{ uri: route.params.file1 }} resizeMode="contain" />
        </PhotoContainer>
      </Container>
    </DismissKeyboard>
  );
};
export default UploadPhoto;
