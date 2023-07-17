import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutFunc } from "../apollo";
import { gql } from "@apollo/client";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragments";
import { useQuery } from "@apollo/client";

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
  const { data } = useQuery(FEED_QUERY);
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
  return (
    <View
      style={{
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <View style={{ height: 20000, flex: 1, backgroundColor: "blue" }}>
          <Text style={{ color: "#fff" }}>Super text</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Feed;
