import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  useWindowDimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType, FlashMode, takePictureAsync } from "expo-camera";

import Slider from "@react-native-community/slider";
import { colors } from "../colors";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Actions = styled.View`
  flex: 0.3;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;
const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-color: #7c7c7c;
  background-color: #7c7c7c;
  border-radius: 50px;
  border: 1px solid #fff;
`;
const SliderContainer = styled.View`
  flex: 0.1;
  justify-content: center;
  align-items: center;
`;
const FlashBtn = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  right: 20px;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
`;
const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 20px;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
`;
export const TakePhoto = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isFocused = useIsFocused();

  const camera = useRef();

  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  //console.log(navigation.canGoBack);
  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [zoom, setZoom] = useState(0);
  const [flashmode, setFlashmode] = useState(FlashMode.off);
  //console.log(flashmode);
  const getPermissions = async () => {
    //카메라사용 허가
    const { granted, status } = await Camera.requestCameraPermissionsAsync();
    console.log(granted, "허가여부");
    setOk(granted);
  };

  useEffect(() => {
    getPermissions();
  }, [ok]);
  // Front&back 's camera Switch
  const toggleCameraType = () => {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  //

  //카메라 zoom
  const onZoomValueChange = (e) => {
    //console.log(e);
    setZoom(e);
  };
  //flashmode
  const onChangeFlashMode = () => {
    if (flashmode === "off") {
      setFlashmode(FlashMode.on);
    } else if (flashmode === "on") {
      setFlashmode(FlashMode.off);
    } else if (flashmode === "auto") {
      setFlashmode(FlashMode.off);
    }
  };
  //찰칵 -> get 'exif' datas'
  const onCameraReady = () => {
    setCameraReady(true);
  };
  const takePictures = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        exif: true, // meta data
        quality: 1,
      });
      console.log(uri);
      setTakenPhoto(uri);
    }
  };
  const goToUpload = async (save) => {
    if (save) {
      //save
      await MediaLibrary.createAssetAsync(takenPhoto);
    }
    // go to upload
    console.log("Will Upload", takenPhoto);
    navigation.navigate("UploadPhoto", {
      file2: takenPhoto,
      file1: takenPhoto,
    });
  };

  //Alert 한 김에 photo.js 의 피드 삭제 버튼에도 적용
  const onUpload = () => {
    Alert.alert(
      "업로드 하시겠습니까?",
      "이미지를 저장하고 업로드하거나 저장 없이 업로드 할 수 있습니다.",
      [
        {
          text: " 내 앨범에 저장하고 업로드 ",
          onPress: () => goToUpload(true),
        },
        {
          text: "아니, 그냥 업로드해줘",
          onPress: () => goToUpload(false),
        },
      ]
    );
  };
  console.log(isFocused);
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {isFocused && takenPhoto === "" ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          ref={camera}
          onCameraReady={onCameraReady}
        />
      ) : takenPhoto !== "" ? (
        <Image
          source={{ uri: takenPhoto }}
          style={{ width: width, height: width * 1.333 }}
        />
      ) : null}
      <FlashBtn onPress={onChangeFlashMode}>
        <Ionicons
          name={flashmode === "off" ? "flash" : "flash-off"}
          size={20}
          color="white"
        />
      </FlashBtn>
      <CloseBtn onPress={() => navigation.navigate("Tabs")}>
        <Ionicons name={"close"} size={20} color="white" />
      </CloseBtn>
      {takenPhoto === "" ? (
        <SliderContainer>
          <Slider
            style={{ width: 350, height: 40 }}
            minimumValue={0}
            maximumValue={0.1}
            minimumTrackTintColor={colors.red}
            maximumTrackTintColor="#eeeeee"
            onValueChange={onZoomValueChange}
          />
        </SliderContainer>
      ) : null}
      <Actions>
        {takenPhoto === "" ? (
          <TouchableOpacity onPress={() => navigation.jumpTo("사진선택")}>
            <Ionicons size={30} color="white" name="image" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onUpload}>
            <Text style={{ color: colors.blue, fontSize: 18 }}>
              Yes, 업로드!
            </Text>
          </TouchableOpacity>
        )}
        {takenPhoto === "" ? (
          <TakePhotoBtn onPress={takePictures} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setTakenPhoto("");
            }}
          >
            <Text style={{ color: colors.blue, fontSize: 18 }}>
              No, 재촬영!
            </Text>
          </TouchableOpacity>
        )}
        {takenPhoto === "" ? (
          <TouchableOpacity onPress={toggleCameraType}>
            <Ionicons
              size={30}
              color="white"
              name={
                cameraType === CameraType.front ? "camera-reverse" : "camera"
              }
            />
          </TouchableOpacity>
        ) : null}
      </Actions>
    </Container>
  );
};
