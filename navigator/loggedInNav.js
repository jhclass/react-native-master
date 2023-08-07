import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { TabsNav } from "./TabsNav";
import { UploadNav } from "./UploadNav";
import UploadPhoto from "../screens/UploadPhoto";

import { Ionicons, AntDesign } from "@expo/vector-icons";
const Stack = createStackNavigator();
export const LoggedInNav = () => {
  //console.log(data, "데이터");
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="UploadNav"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadPhoto"
        options={{
          title: "업로드",
          headerBackTitleVisible: false,
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
          headerBackImage: ({ tintColor }) => (
            <Ionicons name="close" size={28} color={tintColor} />
          ),
        }}
        component={UploadPhoto}
      />
    </Stack.Navigator>
  );
};
