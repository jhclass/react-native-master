import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SelectPhoto } from "../screens/SelectPhoto";
import { TakePhoto } from "../screens/TakePhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, AntDesign } from "@expo/vector-icons";
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
export const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "#fff",
        tabBarIndicatorStyle: {
          backgroundColor: "#d42643",
        },
      }}
    >
      <Tab.Screen name="사진선택">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "black",
                borderBottomWidth: 1, // 하단 테두리 두께 (android) 안드로이드 적용 O
                borderBottomColor: "rgba(212,38,67,0.4)", // 하단 테두리 색상 (android) 안드로이드 적용o
              },
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons name="close" size={28} color={tintColor} />
              ),
            }}
          >
            <Stack.Screen
              name="Select Photo"
              options={{ title: "사진을 선택해주세요" }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="사진촬영" component={TakePhoto} />
    </Tab.Navigator>
  );
};
