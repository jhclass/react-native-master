import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { logoutFunc } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { ME_QUERY, SEEPROFILE_QUERY } from "../fragments";
import { defaultProfileImage } from "../helperFunction";
import styled from "styled-components/native";
import { colors } from "../colors";
import { FlatList } from "react-native-gesture-handler";
import { useRecoilState } from "recoil";
import { setRefresingState } from "../state/state";
import { useWindowDimensions } from "react-native";

const UserAvatar = styled.Image``;

const ProfileContainer = styled.View``;
const ProfileWrap = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  align-items: center;
`;

const ProfileRight = styled.View``;
const ProfileRightCountBox = styled.View`
  padding: 0 20px 30px 20px;
`;
const ProfileLeft = styled.View`
  align-items: center;
`;

const ProfileRightTop = styled.View`
  flex-direction: row;
`;
const ProfileRightBottom = styled.View`
  flex-direction: row;
`;

const ProfileRightText = styled.Text`
  font-size: ${(props) => (props.size === "small" ? "16px" : "30px")};
  color: ${(props) => (props.color === "red" ? colors.red : "#fff")};
`;
const ProfileLeftText = styled.Text`
  font-size: 16px;
  padding: 2px 10px;
  background-color: ${(props) =>
    props.color === "red" ? "#d42643" : "transparent"};
  border-radius: 5px;
`;
const ProfileButtonWrap = styled.View`
  flex-direction: row;
  width: 100%;
`;
const ProfileButton = styled.TouchableOpacity`
  width: 33.3333%;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  border: 1px solid ${colors.red};
  background-color: ${(props) =>
    props.bgColor === "red" ? colors.red : "transparent"};
`;

const Profile = ({ navigation, route }) => {
  const { width } = useWindowDimensions();

  console.log(width);
  const [refreshing, setRefreshing] = useRecoilState(setRefresingState);
  const { data: meQuery, loading } = useQuery(ME_QUERY);

  const {
    data: seeProfileQuery,
    loading: seeProfileLoading,
    error,
    refetch,
    fetchMore,
  } = useQuery(SEEPROFILE_QUERY, {
    variables: {
      username: route?.params?.username,
    },
  });
  if (error) {
    console.error("Error fetching profile:", error.message);
  }
  console.log(meQuery?.me?.username, "me data");
  console.log(navigation);
  console.log(route.params.username, "aaa");
  console.log(seeProfileQuery?.seeProfile?.photos, "asdfasdf");

  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route?.params?.username,
      });
    }
    if (meQuery?.me?.username === route?.params?.username) {
      navigation.navigate("Me");
    }
  }, [navigation, route]);

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderPhoto = ({ item }) => {
    // console.log(item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Photo", {
            photoId: item.id,
          })
        }
        style={{ padding: 5 }}
      >
        <Image
          resizeMode="cover"
          source={{ uri: item?.file }}
          style={{ width: width / 3 - 10, height: width / 3 - 10 }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <ProfileContainer
      style={{
        backgroundColor: "#000",
        flex: 1,
        alignItems: "center",
      }}
    >
      <ProfileWrap>
        <ProfileLeft>
          <UserAvatar
            resizeMode="cover"
            source={
              route?.params?.avatar
                ? { uri: route?.params?.avatar }
                : defaultProfileImage
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
          <ProfileLeftText style={{ color: "#fff" }}>
            {route?.params?.username}
          </ProfileLeftText>
        </ProfileLeft>
        <ProfileRight>
          <ProfileRightTop>
            <ProfileRightCountBox>
              <ProfileRightText style={{ color: "#fff" }} size="small">
                게시글 수
              </ProfileRightText>
              <ProfileRightText style={{ color: "#fff" }}>
                {seeProfileQuery?.seeProfile?.photos.length}{" "}
              </ProfileRightText>
            </ProfileRightCountBox>
            <ProfileRightCountBox>
              <ProfileRightText style={{ color: "#fff" }} size="small">
                POINT
              </ProfileRightText>
              <ProfileRightText color="red">1000 </ProfileRightText>
            </ProfileRightCountBox>
          </ProfileRightTop>
          <ProfileRightBottom>
            <ProfileRightCountBox>
              <ProfileRightText style={{ color: "#fff" }} size="small">
                팔로우
              </ProfileRightText>
              <ProfileRightText style={{ color: "#fff" }}>
                {seeProfileQuery?.seeProfile?.totalFollower}{" "}
              </ProfileRightText>
            </ProfileRightCountBox>
            <ProfileRightCountBox>
              <ProfileRightText style={{ color: "#fff" }} size="small">
                팔로잉
              </ProfileRightText>
              <ProfileRightText style={{ color: "#fff" }}>
                {seeProfileQuery?.seeProfile?.totalFollowing}{" "}
              </ProfileRightText>
            </ProfileRightCountBox>
          </ProfileRightBottom>
        </ProfileRight>
      </ProfileWrap>
      <ProfileButtonWrap>
        <ProfileButton bgColor="red">
          <Text style={{ color: "#fff" }}>팔로우</Text>
        </ProfileButton>
        <ProfileButton>
          <Text style={{ color: "#fff" }}>메세지</Text>
        </ProfileButton>
        <ProfileButton>
          <Text style={{ color: "#fff" }}>포인트 출금</Text>
        </ProfileButton>
      </ProfileButtonWrap>
      <View style={{ flex: 1, width: "100%", marginTop: 5 }}>
        <FlatList
          onEndReachedThreshold={1}
          refreshing={refreshing}
          onRefresh={refresh}
          style={{ width: "100%" }}
          renderItem={renderPhoto}
          data={seeProfileQuery?.seeProfile?.photos}
          keyExtractor={(item, index) => String(index + item)}
          showsVerticalScrollIndicator={false}
          numColumns={3}
        />
      </View>
      <View>
        <Text style={{ color: "#fff" }}>Someones Profiles</Text>
      </View>
    </ProfileContainer>
  );
};

export default Profile;
