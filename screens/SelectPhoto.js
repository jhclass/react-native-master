import React, { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;
const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;
export const SelectPhoto = () => {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);

  const getPhotos = async () => {
    if (ok) {
      const { assets: photos } = await MediaLibrary.getAssetsAsync();
      console.log(photos);
      setPhotos(photos);
    }
  };
  const getPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      setOk(false);
    } else if (status === "granted") {
      setOk(true);
    }
  };
  useEffect(() => {
    getPermissions();
    getPhotos();
  }, [ok]);
  console.log(ok, "ok?");
  return (
    <Container>
      <Top />
      <Bottom>
        <FlatList />
      </Bottom>
    </Container>
  );
};
