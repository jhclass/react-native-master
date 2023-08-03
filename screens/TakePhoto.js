import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import { colors } from "../colors";

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
  top: 100px;
  right: 20px;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
`;
export const TakePhoto = ({ navigation }) => {
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
  return (
    <Container>
      <Camera type={cameraType} style={{ flex: 1 }} zoom={zoom} />
      <FlashBtn onPress={onChangeFlashMode}>
        <Ionicons
          name={flashmode === "off" ? "flash" : "flash-off"}
          size={20}
          color="white"
        />
      </FlashBtn>
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
      <Actions>
        <TouchableOpacity onPress={() => navigation.jumpTo("사진선택")}>
          <Ionicons size={30} color="white" name="image" />
        </TouchableOpacity>
        <TakePhotoBtn></TakePhotoBtn>
        <TouchableOpacity onPress={toggleCameraType}>
          <Ionicons
            size={30}
            color="white"
            name={cameraType === CameraType.front ? "camera-reverse" : "camera"}
          />
        </TouchableOpacity>
      </Actions>
    </Container>
  );
};
