import React from "react";
import styled from "styled-components/native";
import { Text, View, Image } from "react-native";
const Column = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 5px;
`;
const Avatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;
const Username = styled.Text`
  color: #fff;
  margin-left: 10px;
  font-weight: 600;
`;
const Jpop = styled.View`
  flex-direction: space-between;
  align-items: center;
`;
const FollowBtn = styled.TouchableOpacity`
  margin-left: 10px;
  background-color: #d42643;
  padding: 1px 8px;
  border-radius: 2px;
`;
const FollowBtnText = styled.Text`
  color: #fff;
`;

export const UserRow = ({ username, avatar, isFollowing, isMe }) => {
  const defaultProfileImage = require("../assets/default_profile.png");
  console.log(avatar, "전달");
  return (
    <Column>
      <Column>
        <Avatar source={avatar ? { uri: avatar } : defaultProfileImage} />
        <Username style={{ color: "#fff" }}>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Column>
  );
};
