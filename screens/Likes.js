import React, { useState } from "react";
import { View, Text } from "react-native";
import { USER_FRAGMENT } from "../fragments";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { ViewContainer } from "../components/ViewContainer";
import { UserRow } from "../components/UserRow";

const LIKES_QUERY = gql`
  query ($seePhotoLikesId: Int!) {
    seePhotoLikes(id: $seePhotoLikesId) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
const Likes = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: {
      seePhotoLikesId: route.params.photoId,
    },
  });

  console.log(data);
  const renderUser = ({ item: user }) => <UserRow {...user} />;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ViewContainer>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderUser}
        style={{ width: "100%", paddingTop: 10 }}
      />
    </ViewContainer>
  );
};

export default Likes;
