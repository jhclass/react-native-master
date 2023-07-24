import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components/native";
import { useWindowDimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  background-color: red;
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
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: #fff;
  margin-left: 10px;
`;
const LikeNumber = styled.Text`
  color: #fff;
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
  return (
    <Container>
      <Header
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <UserAvatar
          resizeMode="cover"
          source={{ uri: user.avatar }}
          style={{ width: 40, height: 40, borderRadius: 25 }}
        />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{ width: Swidth, height: imageHeight }}
        source={{ uri: file }}
      />
      <Actions>
        <Action />
        <Action />
      </Actions>
      <LikeNumber>
        {likes === 1 ? "1 like" : `${likes}개의 공감을 받았습니다.`}
      </LikeNumber>
      <Caption>
        <Username>{user.username}</Username>
        <CaptionText>{caption}</CaptionText>
      </Caption>
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
