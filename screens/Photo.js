import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { tokenVar, isLoggedInVar, logoutFunc } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { ScrollView } from "react-native";
import { Photo } from "../components/Photo";
import { ViewContainer } from "../components/ViewContainer";
import { RefreshControl } from "react-native";
const SEE_PHOTO_QUERY = gql`
  query ($seePhotoId: Int!) {
    seePhoto(id: $seePhotoId) {
      ...PhotoFragment
      caption
      isMine

      comments {
        ...CommentFragment
      }
      createdAt
      user {
        id
        username
        avatar
      }

      file
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const PhotoScreen = ({ navigation, route }) => {
  const { data, loading, refetch } = useQuery(SEE_PHOTO_QUERY, {
    variables: {
      seePhotoId: route?.params?.photoId,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  //console.log(route?.params?.photoId);
  //console.log(data.seePhoto);
  return (
    <ViewContainer loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ backgroundColor: "#000" }}
        contentContainerStyle={{
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ViewContainer>
  );
};

export default PhotoScreen;
