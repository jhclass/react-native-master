import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutFunc } from "../apollo";
import { gql } from "@apollo/client";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragments";
import { useQuery } from "@apollo/client";
import { ViewContainer } from "../components/ViewContainer";
import { FlatList } from "react-native";
import { Photo } from "../components/Photo";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      caption
      isMine

      comments {
        ...CommentFragment
      }
      createdAt
      user {
        username
        avatar
      }

      file
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Feed = ({ navigation }) => {
  //const [offset, setOffset] = useState(0);
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  // feed 데이터 확인
  //console.log(data);
  // useEffect(() => {
  //   const _retrieveData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("token");
  //       if (value !== null) {
  //         console.log(value, "토큰토큰토큰");
  //       }
  //     } catch (error) {
  //       console.error("Error retrieving data:", error);
  //     }
  //   };

  //   _retrieveData();
  // }, []);
  const renderPhoto = ({ item }) => {
    return (
      // === map
      <Photo {...item} />
    );
  };

  const refresh = async () => {
    //console.log(111111111111111);
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const handleEndReached = () => {
    // 기존의 offset에 데이터의 길이를 더하여 다음 페이지를 가져오도록 설정
    const newOffset = data?.seeFeed?.length || 0;
    fetchMore({
      variables: {
        offset: newOffset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        //console.log(prev, "이이이이이이진진진형형형형형", fetchMoreResult);
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed],
        });
      },
    });
  };
  return (
    <ViewContainer>
      <FlatList
        onEndReachedThreshold={1}
        onEndReached={handleEndReached}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        data={data?.seeFeed}
        keyExtractor={(item) => item.id}
        renderItem={renderPhoto}
        //scrollbar show & hide
        showsVerticalScrollIndicator={false}
      />
    </ViewContainer>
  );
};

export default Feed;
