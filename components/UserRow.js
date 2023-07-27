import React from "react";
import styled from "styled-components/native";
import { Text, View, Image } from "react-native";
import { colors } from "../colors";

const MainContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
`;

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
//

const FollowBtn = styled.TouchableOpacity`
  margin-left: 10px;
  background-color: ${colors.red};
  padding: 1px 8px;
  border-radius: 2px;
`;

const FollowBtnText = styled.Text`
  color: #fff;
`;

const UserRow = ({ username, avatar, isFollowing, isMe }) => {
  console.log(avatar, "전달");
  const defaultProfileImage = require("../assets/default_profile.png");
  console.log(avatar, "전달2");
  return (
    <MainContainer>
      <Column>
        <Avatar source={avatar ? { uri: avatar } : defaultProfileImage} />
        <Username style={{ color: "#fff" }}>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
      {/* {alert("aa")} */}
    </MainContainer>
  );
};

export default UserRow;
