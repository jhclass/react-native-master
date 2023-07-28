import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import Photo from "../../screens/Photo";
import Notification from "../../screens/Notification";
import Feed from "../../screens/Feed";
import Profile from "../../screens/Profile";
import Search from "../../screens/Search";
import Me from "../../screens/Me";
import { Image } from "react-native";
import Likes from "../../screens/Likes";
import Comments from "../../screens/Comments";
const Stack = createStackNavigator();
export default function StackNavFactory({ screenName }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisuble: false,
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerBackImage: () => (
          <Ionicons name="chevron-back-outline" size={20} color="white" />
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
              <Image
                source={require("../../assets/logo_color.png")}
                style={{ maxHeight: 30, maxWidth: 150 }}
              />
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
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
