import { gql, useMutation, useQuery, useEffect } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { ViewContainer } from "../components/ViewContainer";
const SEEPHOTO_COMMENTS_QUERY = gql`
  query SeePhotoComments($seePhotoCommentsId: Int!) {
    seePhotoComments(id: $seePhotoCommentsId) {
      payload
      isMine
    }
  }
`;

const Comments = ({ navigation, route, seePhotoCommentsId }) => {
  console.log(seePhotoCommentsId, "뭐야뭐야");

  if (route?.params?.photoId || seePhotoCommentsId) {
    const { data, loading, refetch } = useQuery(SEEPHOTO_COMMENTS_QUERY, {
      variables: {
        seePhotoCommentsId: route?.params?.photoId
          ? route?.params?.photoId
          : seePhotoCommentsId,
      },
    });

    console.log(data?.seePhotoComments, "loading");

    const [refreshing, setReFreshing] = useState(false);

    const onRefresh = async () => {
      setReFreshing(true);
      await refetch();
      setReFreshing(false);
    };

    const renderComments = ({ item: comment }) => {
      return (
        <View>
          <Text style={{ color: "#fff" }}>{comment?.payload}</Text>
        </View>
      );
    };

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
          data={data?.seePhotoComments}
          keyExtractor={(item, index) => String(item + index)}
          renderItem={renderComments}
          style={{ width: "100%" }}
        />
      </ViewContainer>
    );
  } else {
    return null;
  }
};

export default Comments;
