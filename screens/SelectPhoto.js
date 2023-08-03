import React, { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";

import { colors } from "../colors";

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
const NextBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;
const NextBtnText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
`;

export const SelectPhoto = ({ navigation }) => {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");

  const getPhotos = async () => {
    if (ok) {
      const { assets: photos } = await MediaLibrary.getAssetsAsync();
      console.log(photos);
      setPhotos(photos);
      setChosenPhoto(photos[0]?.uri);
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
  const HeaderRight = () => {
    return (
      <NextBtn>
        <NextBtnText>다음</NextBtnText>
      </NextBtn>
    );
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, []);
  console.log(ok, "ok?");
  const { width } = useWindowDimensions();
  console.log(width);
  const ImageContainer = styled.TouchableOpacity`
    position: relative;
  `;
  const IconCheckBox = styled.View`
    position: absolute;
    top: 5px;
    right: 5px;
  `;
  const choosePhoto = (uri) => {
    if (uri === chosenPhoto) {
      setChosenPhoto("");
    } else {
      setChosenPhoto(uri);
    }
  };
  const renderItem = ({ item: gallery }) => {
    return (
      <ImageContainer
        style={{ padding: 2 }}
        onPress={() => choosePhoto(gallery.uri)}
      >
        <Image
          source={{ uri: gallery.uri }}
          style={{ width: width / 4 - 4, height: width / 4 - 4 }}
        />
        <IconCheckBox>
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color={gallery.uri === chosenPhoto ? colors.blue : "white"}
          />
        </IconCheckBox>
      </ImageContainer>
    );
  };
  return (
    <Container>
      <Top style={{ padding: 2 }}>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width: width, height: width }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={4}
          keyExtractor={(item, index) => String(item + index)}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
};
