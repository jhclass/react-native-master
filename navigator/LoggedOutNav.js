import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";
const Stack = createStackNavigator();
const LoggedOutNav = () => {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        title: "hello",
        headerBackTitle: "prev",
        headerTintColor: "green",
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{
          title: "welcome baby",
        }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
};
export default LoggedOutNav;
