import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components/native";
const Container = styled.View`
  background-color: red;
`;
const Header = styled.View``;
const UserAvatar = styled.Image``;
const Username = styled.Text``;
const File = styled.Image``;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CaptionText = styled.Text``;
const LikeNumber = styled.Text``;
export const Photo = ({
  id,
  username,
  avatar,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
}) => {
  return (
    <Container>
      <Header>
        <UserAvatar />
        <Username>{username}</Username>
      </Header>
      <File />
      <Actions>
        <Action />
        <Action />
      </Actions>
      <LikeNumber>
        {likes === 1 ? "1 like" : `${likes}개의 공감을 받았습니다.`}
      </LikeNumber>
      <Caption>
        <Username>{username}</Username>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  commentNumber: PropTypes.number.isRequired,
};
