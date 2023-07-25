import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components/native";
import { useWindowDimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
  mutation ($toggleLikeId: Int!) {
    toggleLike(id: $toggleLikeId) {
      ok
      error
    }
  }
`;

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
  const updateToggleLike = (cache, result) => {
    console.log(cache, result);
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    //console.log(ok);
    if (ok) {
      //console.log("toggleLike 가 제대로 동작함.");
      //console.log(likes, isLiked);
      const fragmentId = `Photo:${id}`;
      cache.modify({
        id: fragmentId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
      // const fragment = gql`
      //   fragment BSName on Photo {
      //     isLiked
      //     likes
      //   }
      // `;
      // Photo 컴포넌트안에 arg 가 없어도 readFragment 를 통해서 불러올수 있어
      // const result = cache.readFragment({
      //   id: fragmentId,
      //   fragment: fragment,
      // });
      // console.log(result);
      // cache.writeFragment({
      //   id: fragmentId,
      //   fragment: fragment,
      //   data: {
      //     isLiked: !isLiked,
      //     likes: isLiked ? likes - 1 : likes + 1,
      //   },
      // });
    }
    //console.log(likes, isLiked);
  };
  const [toggleLikes] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id: id,
    },
    //onCompleted: datachk,
    //refetchQueries: [{ query: FEED_QUERY }],
    update: updateToggleLike,
  });
  //console.log(toggleLikeMutation);
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
      <ExtraContainer>
        <Actions>
          <Action>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "#d42643" : "#fff"}
              size={20}
            />
          </Action>
          <Action>
            <Ionicons name="chatbubble-outline" color={"#fff"} size={20} />
          </Action>
        </Actions>
        <TouchableOpacity>
          <LikeNumber
            onPress={() => {
              navigation.navigate("Likes");
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
