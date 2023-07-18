import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";
const Container = styled.View`
  background-color: red;
`;
const Header = styled.View``;
const UserAvatar = styled.Image``;
const Username = styled.Text`
  color: #fff;
`;
const File = styled.Image``;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CaptionText = styled.Text`
  color: #fff;
`;
const LikeNumber = styled.Text`
  color: #fff;
`;
export const Photo = ({ id, user, caption, file, isLiked, likes }) => {
  const { width } = useWindowDimensions();
  //console.log(dimensions);
  return (
    <Container>
      <Header>
        <UserAvatar />
        <Username>{user.username}</Username>
      </Header>
      <File
        style={{ width: width, height: width * 1.2 }}
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
