import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components/native";
import { useWindowDimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { Text } from "react-native";
import LikeAction from "./LikeAction";

const Container = styled.View`
  margin-bottom: 10px;
`;
const Header = styled.TouchableOpacity`
  padding: 20px 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
`;
const Username = styled.Text`
  color: #fff;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CaptionText = styled.Text`
  color: #fff;
  margin-left: 10px;
`;
const LikeNumber = styled.Text`
  color: #fff;
  margin: 7px 0px;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;
export const Photo = ({ id, user, caption, file, isLiked, likes }) => {
  const { width: Swidth } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(300);
  const navigation = useNavigation();
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      //   console.log(width);
      //   console.log(height);
      setImageHeight((height * Swidth) / width);
    });
  }, [file]);
  //console.log(dimensions);

  //console.log(toggleLikeMutation);
  const defaultProfileImage = require("../assets/default_profile.png");
  return (
    <Container>
      <Text style={{ color: "#fff" }}>
        사진번호 : {id}, 공감숫자 :{likes}, 내가 공감을 하였는가:
        {isLiked ? "true" : "false"}
      </Text>
      <Header
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <UserAvatar
          resizeMode="cover"
          source={user.avatar ? { uri: user.avatar } : defaultProfileImage}
          style={{ width: 40, height: 40, borderRadius: 25 }}
        />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{ width: Swidth, height: imageHeight }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <LikeAction isLiked={isLiked} id={id} />
          <Action>
            <Ionicons name="chatbubble-outline" color={"#fff"} size={20} />
          </Action>
        </Actions>
        <TouchableOpacity>
          <LikeNumber
            onPress={() => {
              navigation.navigate("Likes", { photoId: id });
            }}
          >
            {likes === 1 ? "1 like" : `${likes}개의 공감을 받았습니다.`}
          </LikeNumber>
        </TouchableOpacity>

        <Caption>
          <Username>{user.username}</Username>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),

  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  commentNumber: PropTypes.number.isRequired,
};
