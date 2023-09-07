import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import { tokenVar, isLoggedInVar, logoutFunc } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { ScrollView } from "react-native";
import { Photo } from "../components/Photo";
import { ViewContainer } from "../components/ViewContainer";

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
  console.log(route?.params?.photoId, "이거모른다고?");
  //console.log(data.seePhoto);
  return (
    <ViewContainer loading={loading}>
      <FlatList
        data={[data?.seePhoto]} // FlatList expects an array, so we pass the photo data as an array with a single element
        renderItem={({ item }) => <Photo {...item} />} // We spread the photo data into the Photo component
        keyExtractor={(item) => item?.id.toString()} // We use the photo ID as the key
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          backgroundColor: "#000",
        }}
        style={{ width: "100%" }}
      />
    </ViewContainer>
  );
};

export default PhotoScreen;
