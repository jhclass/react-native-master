import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SelectPhoto } from "../screens/SelectPhoto";
import { TakePhoto } from "../screens/TakePhoto";
import { createStackNavigator } from "@react-navigation/stack";
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
export const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: { backgroundColor: "black" },
        activeTintColor: "#fff",
        indicatorStyle: {
          backgroundColor: "#d42643",
        },
      }}
    >
      <Tab.Screen name="사진선택">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Select Photo" component={SelectPhoto} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="사진촬영" component={TakePhoto} />
    </Tab.Navigator>
  );
};
