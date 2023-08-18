import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import React from "react";
import Photo from "../../screens/Photo";
import Notification from "../../screens/Notification";
import Feed from "../../screens/Feed";
import Profile from "../../screens/Profile";
import Search from "../../screens/Search";
import Me from "../../screens/Me";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Likes from "../../screens/Likes";
import Comments from "../../screens/Comments";
import { colors } from "../../colors";
const Stack = createStackNavigator();
export default function StackNavFactory({ screenName }) {
  const { width } = useWindowDimensions();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerBackImage: ({ tintColor }) => (
          <Ionicons name="chevron-back-outline" size={20} color={tintColor} />
        ),
        headerStyle: {
          borderBottomWidth: 1, // 하단 테두리 두께 (android) 안드로이드 적용 O
          borderBottomColor: "rgba(212,38,67,0.4)", // 하단 테두리 색상 (android) 안드로이드 적용o
          //borderBottomColor: "rgba(255,255,255,0.3)", //ios 만 적용
          //shadowColor: "#fff", //ios 만 적용
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"Feed"}
          component={Feed}
          options={{
            headerTitle: () => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: width,
                  backgroundColor: "#000",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Image
                  source={require("../../assets/logo_color.png")}
                  style={{
                    maxHeight: 30,
                    maxWidth: 150,
                  }}
                  resizeMode="contain"
                />
                <TouchableOpacity>
                  <Ionicons
                    name="paper-plane-outline"
                    size={20}
                    color="#d42643"
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Notification" ? (
        <Stack.Screen name={"Notification"} component={Notification} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen
        name="Likes"
        component={Likes}
        options={{ headerTitle: "당신을 응원합니다. 👍" }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ headerTitle: "댓글" }}
      />
    </Stack.Navigator>
  );
}
