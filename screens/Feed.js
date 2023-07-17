import React, { useEffect } from "react";
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

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
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
  const { data, loading } = useQuery(FEED_QUERY);
  // feed 데이터 확인
  console.log(data);
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
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white" }}>{item.caption}</Text>
      </View>
    );
  };
  return (
    <ViewContainer>
      <FlatList
        data={data?.seeFeed}
        keyExtractor={(item) => item.id}
        renderItem={renderPhoto}
      />
    </ViewContainer>
  );
};

export default Feed;
