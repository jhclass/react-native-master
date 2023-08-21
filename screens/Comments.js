import { PropTypes } from "prop-types";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useRef, useState, useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { formatDate, defaultProfileImage } from "../helperFunction";
import Reply from "./Reply";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { ViewContainer } from "../components/ViewContainer";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { useRecoilState } from "recoil";
import { setRefresingState } from "../state/state";
const ME_QUERY = gql`
  query Me {
    me {
      avatar
      username
    }
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($deleteCommentId: Int!) {
    deleteComment(id: $deleteCommentId) {
      error
      id
      ok
    }
  }
`;
const SEEPHOTO_COMMENTS_QUERY = gql`
  query SeePhotoComments($seePhotoCommentsId: Int!) {
    seePhotoComments(id: $seePhotoCommentsId) {
      id
      createdAt
      isMine
      payload
      user {
        avatar
        username
      }
    }
  }
`;
const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      error
      id
      ok
    }
  }
`;
const CREATE_REPLY_COMMENT_MUTATION = gql`
  mutation CreateReplyComment($commentId: Int!, $payload: String!) {
    createReplyComment(commentId: $commentId, payload: $payload) {
      error
      ok
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
  margin-top: 10px;
`;
const Avatar = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;
const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
const InputAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-right: 10px;
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
  align-items: center;
`;

const ReplyContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const ReplyContainerBtn = styled.TouchableOpacity`
  margin-left: 10px;
`;

const Comments = ({ navigation, route, seePhotoCommentsId, currentLoca }) => {
  const { data: meQueryData } = useQuery(ME_QUERY);
  //console.log(meQueryData);
  // console.log(currentLoca);
  if (route?.params?.photoId || seePhotoCommentsId) {
    const { register, handleSubmit, watch, setValue } = useForm();
    const { data, loading, refetch } = useQuery(SEEPHOTO_COMMENTS_QUERY, {
      variables: {
        seePhotoCommentsId: route?.params?.photoId
          ? route?.params?.photoId
          : seePhotoCommentsId,
      },
    });
    const [createCommentMutation, { loading: createCommentLoading }] =
      useMutation(CREATE_COMMENT_MUTATION, {
        update: (cache, result) => {
          console.log(result, "업데이트할 데이터");
          const {
            data: { createComment },
          } = result;
          if (createComment.id) {
            cache.modify({
              id: "ROOT_QUERY",
              fields: {
                seePhotoComments(prev) {
                  const newComment = [createComment, ...prev];
                  return newComment;
                },
              },
            });
          }
        },
      });

    const [createReplyComment, { loading: createReplyCommentLoading }] =
      useMutation(CREATE_REPLY_COMMENT_MUTATION, {
        onCompleted: (data) => {
          console.log(data);
        },
      });
    const [deleteCommentMutation, { loading: deleteCommentLoading }] =
      useMutation(DELETE_COMMENT_MUTATION);
    const onDeleteComment = (commentId) => {
      if (!deleteCommentLoading) {
        deleteCommentMutation({
          variables: {
            deleteCommentId: commentId,
          },
          onCompleted: (data) => {
            console.log(data);
          },
          update: (cache, result) => {
            console.log(result, "결과를 알려줘");
            const {
              deleteComment: { ok },
            } = result.data;
            if (ok) {
              cache.modify({
                id: "ROOT_QUERY",
                fields: {
                  seePhotoComments(extingComments, { readField }) {
                    // console.log(
                    //   readField("error", {
                    //     __typename: "MutationResponse",
                    //     error: null,
                    //     id: 111,
                    //     ok: true,
                    //   })
                    // );
                    const newComments = extingComments.filter(
                      (comment) => readField("id", comment) !== commentId
                    );
                    return newComments;
                  },
                },
              });
            }
          },
        });
      }
    };
    //const [refreshing, setReFreshing] = useState(false);
    const [refreshing, setRefreshing] = useRecoilState(setRefresingState);
    const [replies, setReplies] = useState(0);
    const [repliesState, setRepliesState] = useState(false);
    const createCommentsForm = useRef();
    const replyNum = (data) => {
      setRepliesState(true);

      setReplies(data);
      createCommentsForm?.current?.focus();
    };
    const handleInputBlur = async () => {
      setRepliesState(false);
    };
    // useEffect(() => {
    //   console.log(repliesState, "input 상태");
    // }, [repliesState]);
    const onValid = (data) => {
      //console.log(data, "데이터를 알려줘");
      //console.log(replies, "현재 댓글의 번호를 알려줘");
      if (repliesState) {
        //console.log(replies);
        //해당 댓글의 댓글 생성
        createReplyComment({
          variables: {
            commentId: replies,
            payload: data.createComment,
          },
        });
        setRepliesState(false);
      } else {
        createCommentMutation({
          variables: {
            photoId: route?.params?.photoId
              ? route?.params?.photoId
              : seePhotoCommentsId,
            payload: data.createComment,
          },
        });
      }

      setValue("createComment", "");
    };
    const onRefresh = async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    };

    const renderComments = ({ item: comment }) => {
      //console.log(comment?.id);
      //console.log(comment.replies, "없닫고?");

      return (
        <>
          <CommentContainer>
            <Avatar
              source={
                comment?.user?.avatar
                  ? { uri: comment?.user?.avatar }
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
            </CommentModifyBtn>
          </CommentContainer>
          <ReplyContainer>
            <ReplyContainerBtn>
              <Text style={{ color: "rgba(255,255,255,0.5)" }}>
                {formatDate(+comment?.createdAt)}
              </Text>
            </ReplyContainerBtn>
            {comment?.isMine ? null : (
              <ReplyContainerBtn onPress={() => replyNum(comment?.id)}>
                <Text style={{ color: "rgba(255,255,255,0.5)" }}>댓글쓰기</Text>
              </ReplyContainerBtn>
            )}
            {comment?.isMine ? (
              <ReplyContainerBtn onPress={() => onDeleteComment(comment.id)}>
                <Text style={{ color: "rgba(255,255,255,0.5)" }}>삭제</Text>
              </ReplyContainerBtn>
            ) : null}
          </ReplyContainer>
          <Reply commentId={comment?.id} currentLoca={currentLoca} />
        </>
      );
    };

    return (
      <DismissKeyboard>
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
              data={
                currentLoca
                  ? (data?.seePhotoComments).slice(0, 2)
                  : data?.seePhotoComments
              }
              keyExtractor={(item, index) => String(item + index)}
              renderItem={renderComments}
              style={{ width: "100%", marginTop: 10, marginBottom: 20 }}
            />
          )}

          <InputContainer>
            <InputAvatar
              source={
                meQueryData?.me?.avatar
                  ? { uri: meQueryData?.me?.avatar }
                  : defaultProfileImage
              }
            />
            <TextInput
              ref={createCommentsForm}
              placeholder="댓글을 입력하세요"
              placeholderTextColor={"#111"}
              style={{
                color: "#111",
                backgroundColor: "white",
                padding: 10,
                width: 320,
                borderRadius: 10,
              }}
              name="createComment"
              value={watch("createComment")}
              onBlur={handleInputBlur}
              onChangeText={(text) =>
                setValue("createComment", text.replace(/[\n\s]/g, ""))
              }
              onSubmitEditing={handleSubmit(onValid)}
            />
          </InputContainer>
        </ViewContainer>
      </DismissKeyboard>
    );
  } else {
    return null;
  }
};

export default Comments;
