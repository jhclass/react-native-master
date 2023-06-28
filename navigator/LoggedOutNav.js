import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";
const Stack = createStackNavigator();
const LoggedOutNav = () => {
  return (
    <Stack.Navigator mode="modal" headerMode="screen" screenOptions={{}}>
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
          headerTitle: false,
        }}
        component={Welcome}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};
export default LoggedOutNav;
