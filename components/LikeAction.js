import React from "react";
import { PropTypes } from "prop-types";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const TOGGLE_LIKE_MUTATION = gql`
  mutation ($toggleLikeId: Int!) {
    toggleLike(id: $toggleLikeId) {
      ok
      error
    }
  }
`;
const LikeAction = ({ id, isLiked }) => {
  const updateToggleLike = (cache, result) => {
    //console.log(result);
    //console.log(cache, result);
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
    //console.log(prev, isLiked);
  };
  const [toggleLikes] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      toggleLikeId: id,
    },
    //onCompleted: datachk,
    //refetchQueries: [{ query: FEED_QUERY }],
    update: updateToggleLike,
  });
  return (
    <Action onPress={toggleLikes}>
      <Ionicons
        name={isLiked ? "heart" : "heart-outline"}
        color={isLiked ? "#d42643" : "#fff"}
        size={20}
      />
    </Action>
  );
};

export default LikeAction;

LikeAction.propTypes = {
  id: PropTypes.number.isRequired,

  isLiked: PropTypes.bool.isRequired,
};
