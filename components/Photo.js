import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components/native";
import { useWindowDimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { Text } from "react-native";
import LikeAction from "./LikeAction";
import { colors } from "../colors";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragments";
const DELETE_PHOTO_MUTATION = gql`
  mutation ($deletePhotoId: Int!) {
    deletePhoto(id: $deletePhotoId) {
      ok
      error
    }
  }
`;
const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      caption
      isMine

      comments {
        ...CommentFragment
      }
      createdAt
      user {
        username
        avatar
      }

      file
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;
const Container = styled.View`
  margin-bottom: 10px;
`;
const Header = styled.View`
  padding: 20px 10px;
  flex-direction: row;
  justify-content: space-between;
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
  margin-bottom: 5px;
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
  color: ${colors.white};
  margin: 0px 0px 5px 0px;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;
const UserContainer = styled.TouchableOpacity`
  flex-direction: row;

  align-items: center;
`;
const DeleteBtn = styled.TouchableOpacity`
  padding: 1px 4px;
  background-color: ${colors.red};
  border-radius: 2px;
`;
const DeleteBtnText = styled.Text`
  color: ${colors.white};
`;
export const Photo = ({ id, user, caption, file, isLiked, likes, isMine }) => {
  //console.log(id);
  console.log(isMine);
  const { width: Swidth } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(300);
  const navigation = useNavigation();
  const [deletePhoto, { loading }] = useMutation(DELETE_PHOTO_MUTATION, {
    variables: {
      deletePhotoId: id,
    },
    onCompleted: (data) => {
      const {
        deletePhoto: { ok, error },
      } = data;
      if (ok) {
        alert("삭제 되었습니다.");
      } else {
        alert("삭제 할 수 없습니다.");
      }
    },
    refetchQueries: [
      {
        query: FEED_QUERY,
        variables: {
          offset: 0,
        },
      },
    ],
  });
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
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      id: user.id,
    });
  };
  return (
    <Container>
      {/* <Text style={{ color: "#fff" }}>
        사진번호 : {id}, 공감숫자 :{likes}, 내가 공감을 하였는가:
        {isLiked ? "true" : "false"}
      </Text> */}
      <Header>
        <UserContainer onPress={goToProfile}>
          <UserAvatar
            resizeMode="cover"
            source={user.avatar ? { uri: user.avatar } : defaultProfileImage}
            style={{ width: 40, height: 40, borderRadius: 25 }}
          />
          <Username>{user.username}</Username>
        </UserContainer>
        {isMine ? (
          <DeleteBtn onPress={deletePhoto}>
            <DeleteBtnText>삭제</DeleteBtnText>
          </DeleteBtn>
        ) : null}
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
        {likes > 0 ? (
          <TouchableOpacity>
            <LikeNumber
              onPress={() => {
                navigation.navigate("Likes", { photoId: id });
              }}
            >
              {`${likes}개의 공감을 받았습니다.`}
            </LikeNumber>
          </TouchableOpacity>
        ) : null}

        <Caption>
          <Username onPress={goToProfile}>{user.username}</Username>
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
