import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "../components/nav/StackNavFactory";

const Tabs = createBottomTabNavigator();
export const LoggedInNav = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "#d42643",

        showLabel: false,
        style: {
          borderTopColor: "#d42643",
          backgroundColor: "#000",
        },
      }}
    >
      <Tabs.Screen
        name="Feed"
        // component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="home"
              color={color}
              focused={focused}
              focusedSize={22}
              defaultSize={18}
            />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="search"
              color={color}
              focused={focused}
              focusedSize={22}
              defaultSize={18}
            />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Camera"
        component={View}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="camera-outline"
              color={color}
              focused={focused}
              focusedSize={24}
              defaultSize={20}
            />
          ),

          //Changes in the background color or button shape cannot be controlled with the default options.
          // tabBarButton: ({ focused, color, size }) => (
          //   <TouchableOpacity
          //     style={{
          //       backgroundColor: "red",
          //       borderRadius: 15,
          //       width: 100,
          //       height: 100,
          //       marginTop: -50,
          //     }}
          //   >
          //     <Text>camera</Text>
          //   </TouchableOpacity>
          // ),
        }}
      />

      <Tabs.Screen
        name="Notification"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="heart-outline"
              color={color}
              focused={focused}
              focusedSize={22}
              defaultSize={18}
            />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notification" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Me"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="person-outline"
              color={color}
              focused={focused}
              focusedSize={22}
              defaultSize={18}
            />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};
