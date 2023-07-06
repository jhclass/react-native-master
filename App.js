import React, { useState, useEffect } from "react";
import { useColorScheme, Appearance } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigator/LoggedOutNav";
import { LoggedInNav } from "./navigator/loogedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => {
    setLoading(false);
  };
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log("Current theme:", colorScheme);
  }, [colorScheme]);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo_color.png"),
      "https://i.namu.wiki/i/vFksTgL18GIw0SE8VN8h1PGcCdJQEemXJQn-dfkVghTdlEec5fzby6H61626CLN8Wp5YpR0olJDtwCN_ucoMlri_FLfj-8UvlNoaJ7abh6lPDREP0WvxwXzRtlPOkWsGjqHugl9GpEZaYgfchb4s3Q.svg",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token, "스토리지");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };

  const colorScheme2 = Appearance.getColorScheme();
  if (colorScheme2 === "dark") {
    // Use dark color scheme
    console.log("Dakr 입니다");
  } else if (colorScheme2 === "light") {
    console.log("Light 입니다");
  }
  // Use light color scheme
  // Dark mode로 변경해도 계속 light를 반환
  // 아이폰,안드로이드 둘다 마찬가지
  // 작업하면서 체크
  Appearance.addChangeListener(({ colorScheme2 }) => {
    console.log(colorScheme2);
  });
  if (loading) {
    return (
      <AppLoading
        onError={console.warn}
        onFinish={onFinish}
        startAsync={preload}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
