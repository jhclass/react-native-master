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
  StatusBar,
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
  const [photoLocal, setPhotoLocal] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  console.log(chosenPhoto, "파일네임뭐냐");

  const getPhotos = async () => {
    if (ok && !loadingMore) {
      setLoadingMore(true);
      const lastPhoto = photos[photos.length - 1];
      const {
        assets: newPhotos,
        hasNextPage,
        endCursor,
      } = await MediaLibrary.getAssetsAsync({
        after: lastPhoto ? lastPhoto.id : undefined,
      });
      console.log(
        photos[newPhotos.length - 1],

        "몇개의 이미지를 불러왔니?"
      );
      if (newPhotos.length > 0) {
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        setChosenPhoto(newPhotos[0]?.uri);
      }
      setLoadingMore(false);
    }
  };
  const handleEndReached = () => {
    if (photos.length > 0) {
      const lastPhoto = photos[photos.length - 1];
      getPhotos(lastPhoto.id); // Pass the last photo's id for pagination
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
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto, photoLocal]);
  const HeaderRight = () => {
    return (
      <NextBtn
        onPress={() =>
          navigation.navigate("UploadPhoto", {
            file1: chosenPhoto,
            file2: photoLocal,
          })
        }
      >
        <NextBtnText>다음</NextBtnText>
      </NextBtn>
    );
  };

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

  const choosePhoto = async (uri, id) => {
    const assetInfo = await MediaLibrary.getAssetInfoAsync(id);
    if (id === chosenPhoto) {
      setChosenPhoto("");
    } else {
      setChosenPhoto(uri);
      setPhotoLocal(assetInfo.localUri);
    }
  };

  const renderItem = ({ item: gallery }) => {
    return (
      <ImageContainer
        style={{ padding: 2 }}
        onPress={() => choosePhoto(gallery.uri, gallery.id)}
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
      <StatusBar hidden={false} />
      <Top style={{ padding: 2 }}>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            resizeMode="contain"
            style={{ height: 100 + "%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={4}
          keyExtractor={(item, index) => String(item + index)}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
        />
      </Bottom>
    </Container>
  );
};
