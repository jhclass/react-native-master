import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { USER_FRAGMENT } from "../fragments";
import { gql, useQuery } from "@apollo/client";

import { FlatList } from "react-native";
import { ViewContainer } from "../components/ViewContainer";
import UserRow from "../components/UserRow";
import styled from "styled-components/native";
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
    skip: !route.params.photoId,
  });
  refetch();
  console.log(data);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderUser = ({ item: user }) => <UserRow {...user} />;
  return (
    <ViewContainer>
      <FlatList
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            />
          );
        }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        keyExtractor={(item, index) => String(item + index)}
        renderItem={renderUser}
        style={{ width: "100%" }}
      />
    </ViewContainer>
  );
};

export default Likes;
