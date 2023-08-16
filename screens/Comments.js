import { PropTypes } from "prop-types";
import { gql, useMutation, useQuery, useEffect } from "@apollo/client";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { ViewContainer } from "../components/ViewContainer";
import styled from "styled-components/native";
import { colors } from "../colors";
const SEEPHOTO_COMMENTS_QUERY = gql`
  query SeePhotoComments($seePhotoCommentsId: Int!) {
    seePhotoComments(id: $seePhotoCommentsId) {
      payload
      isMine
      user {
        avatar
        username
      }
    }
  }
`;
const CommentContainer = styled.View`
  padding: 2px;
  align-items: flex-start;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden; /* Add this line */
`;
const Avatar = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const CommentText = styled.Text`
  flex: 1;
  margin-left: 5px;
  color: #fff;
`;

const CommentUser = styled.Text`
  margin-left: 5px;
  color: ${colors.blue};
  font-weight: 600;
`;

const CommentModifyBtn = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 5px;
  align-items: center;
`;
const defaultProfileImage = require("../assets/default_profile.png");
const Comments = ({ navigation, route, seePhotoCommentsId }) => {
  console.log(seePhotoCommentsId, "뭐야뭐야2");

  if (route?.params?.photoId || seePhotoCommentsId) {
    const { data, loading, refetch } = useQuery(SEEPHOTO_COMMENTS_QUERY, {
      variables: {
        seePhotoCommentsId: route?.params?.photoId
          ? route?.params?.photoId
          : seePhotoCommentsId,
      },
    });

    console.log(data, "loading");

    const [refreshing, setReFreshing] = useState(false);

    const onRefresh = async () => {
      setReFreshing(true);
      await refetch();
      setReFreshing(false);
    };

    const renderComments = ({ item: comment }) => {
      return (
        <>
          <CommentContainer>
            <Avatar
              source={
                comment?.user?.avatar
                  ? { uri: comment.user.avatar }
                  : defaultProfileImage
              }
            />
            <CommentUser>{comment.user.username}</CommentUser>
            <CommentText>{comment?.payload}</CommentText>
            <CommentModifyBtn>
              {!comment?.isMine ? (
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <MaterialCommunityIcons
                    name="alarm-light-outline"
                    size={18}
                    color={colors.red}
                  />
                </TouchableOpacity>
              ) : null}
              {comment?.isMine ? (
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <AntDesign name="close" size={16} color="white" />
                </TouchableOpacity>
              ) : null}
            </CommentModifyBtn>
          </CommentContainer>
        </>
      );
    };

    return (
      <ViewContainer>
        {loading ? (
          <Text style={{ marginTop: 20 }}>Loading...</Text>
        ) : (
          <FlatList
            // ItemSeparatorComponent={() => {
            //   return (
            //     <View
            //       style={{
            //         width: "100%",
            //         height: 1,
            //         backgroundColor: "rgba(255,255,255,0.2)",
            //       }}
            //     />
            //   );
            // }}
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={data?.seePhotoComments}
            keyExtractor={(item, index) => String(item + index)}
            renderItem={renderComments}
            style={{ width: "100%", marginTop: 10 }}
          />
        )}
      </ViewContainer>
    );
  } else {
    return null;
  }
};

export default Comments;
