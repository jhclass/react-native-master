import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigator/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => {
    setLoading(false);
  };
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo_color.png"),
      "https://i.namu.wiki/i/vFksTgL18GIw0SE8VN8h1PGcCdJQEemXJQn-dfkVghTdlEec5fzby6H61626CLN8Wp5YpR0olJDtwCN_ucoMlri_FLfj-8UvlNoaJ7abh6lPDREP0WvxwXzRtlPOkWsGjqHugl9GpEZaYgfchb4s3Q.svg",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    //console.log(fontPromises);
    return Promise.all([...fontPromises, ...imagePromises]);
  };

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
    <NavigationContainer>
      <LoggedOutNav />
    </NavigationContainer>
  );
}
