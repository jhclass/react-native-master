import { gql, useQuery } from "@apollo/client";
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { defaultProfileImage } from "../helperFunction";
import { useRecoilState } from "recoil";
import { setRefresingState } from "../state/state";
const SEE_REPLY_COMMENT = gql`
  query Query($commentId: Int!) {
    seeReplyComment(commentId: $commentId) {
      comment
      commentId
      createdAt
      id
      isMine
      payload
      updatedAt
      user {
        id
        avatar
        username
      }
    }
  }
`;

const ReplyContainer = styled.View`
  margin-bottom: 5px;
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
`;
const ReplyTouches = styled.TouchableOpacity`
  margin-right: 5px;
`;
const ReplyUsername = styled.Text``;
const ReplyPayload = styled.Text``;

const Avatar = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 5px;
`;
const RotateIcons = styled.View`
  margin-right: 5px;
  transform: rotate(180deg);
`;
const CloseBtn = styled.TouchableOpacity`
  margin-left: 10px;
`;
const Reply = ({ commentId, currentLoca }) => {
  //console.log(commentId);
  const { data, loading, refetch } = useQuery(SEE_REPLY_COMMENT, {
    variables: {
      commentId: commentId,
    },
  });
  refetch(); //업데이트 앱 사용량 증가시 보완필요
  const { seeReplyComment } = data || {}; // data 객체가 존재하는지 확인한 후에 렌더링하도록 변경
  if (seeReplyComment === null) {
    return;
  }
  console.log(data, "replyData");
  const [refreshing, setRefreshing] = useRecoilState(setRefresingState);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const renderRplyComments = ({ item: reply }) => {
    return (
      <ReplyContainer>
        <RotateIcons>
          <Octicons name="reply" size={16} color="#fff" />
        </RotateIcons>
        <Avatar
          source={
            reply?.user?.avatar
              ? { uri: reply?.user?.avatar }
              : defaultProfileImage
          }
        />
        <ReplyTouches>
          <ReplyUsername style={{ color: "#fff" }}>
            {reply?.user?.username}
          </ReplyUsername>
        </ReplyTouches>
        <ReplyPayload style={{ color: "#fff" }}>{reply?.payload}</ReplyPayload>
        {reply?.isMine && (
          <CloseBtn>
            <Ionicons name="close-outline" size={18} color="#fff" />
          </CloseBtn>
        )}
      </ReplyContainer>
    );
  };
  //console.log(seeReplyComment);
  //flatList로 변경
  return loading ? (
    <Text>loading...</Text>
  ) : (
    <>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={currentLoca ? seeReplyComment?.slice(0, 2) : seeReplyComment}
        keyExtractor={(item, index) => String(item + index)}
        renderItem={renderRplyComments}
        style={{ width: "100%" }}
      />
      {/* {seeReplyComment?.map((reply, index) => (
        <ReplyContainer key={index}>
          <RotateIcons>
            <Octicons name="reply" size={16} color="#fff" />
          </RotateIcons>
          <Avatar
            source={
              reply?.user?.avatar
                ? { uri: reply?.user?.avatar }
                : defaultProfileImage
            }
          />
          <ReplyTouches>
            <ReplyUsername style={{ color: "#fff" }}>
              {reply?.user?.username}
            </ReplyUsername>
          </ReplyTouches>
          <ReplyPayload style={{ color: "#fff" }}>
            {reply?.payload}
          </ReplyPayload>
          {reply?.isMine && (
            <CloseBtn>
              <Ionicons name="close-outline" size={18} color="#fff" />
            </CloseBtn>
          )}
        </ReplyContainer>
      ))} */}
    </>
  );
};
export default Reply;
