import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Photo from "../../screens/Photo";
import Notification from "../../screens/Notification";
import Feed from "../../screens/Feed";
import Profile from "../../screens/Profile";
import Search from "../../screens/Search";
import Me from "../../screens/Me";
const Stack = createStackNavigator();
export default function StackNavFactory({ screenName }) {
  return (
    <Stack.Navigator>
      {screenName === "Feed" ? (
        <Stack.Screen name={"Feed"} component={Feed} />
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
    </Stack.Navigator>
  );
}
