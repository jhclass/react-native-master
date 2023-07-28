import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { logoutFunc } from "../apollo";
import styled from "styled-components";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native";
import { colors } from "../colors";
const SEARCH_PHOTOS = gql`
  query ($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;
const Input = styled.TextInput`
  /* width: 100px;
  height: 40px;
  background-color: #fff; */
`;
const SearchingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Searching = styled.Text`
  color: ${colors.white};
  margin-top: 10px;
`;
const Search = ({ navigation }) => {
  const { register, setValue, watch, handleSubmit } = useForm();
  //바로 실행되지 않음 (lazyQuery)
  //사용자가 글작성시 바로바로 나타나게 하려면 useQuery() 사용해야지
  const [searchPhotoLazy, { loading, data, called }] = useLazyQuery(
    SEARCH_PHOTOS
    //
    // {
    //   variables: {
    //     keyword: watch("keyword"),
    //   },
    // }
  );
  //console.log(watch());
  const onSearchSubmit = ({ keyword }) => {
    //console.log("aaaaa");
    console.log(keyword, "검색어입니다");
    searchPhotoLazy({
      variables: {
        keyword: keyword,
      },
    });
  };

  console.log(data, "검색된 내용");
  const searchBox = () => {
    return (
      <TextInput
        style={{ backgroundColor: "#fff" }}
        placeholderTextColor="black"
        placeholder="Write search photo"
        autoCapitalize="none"
        returnKeyLabel="Search"
        returnKeyType="search"
        onChangeText={(text) => setValue("keyword", text)}
        autoCorrect={false} //키보드 자동수정기능 끄기
        onSubmitEditing={handleSubmit(onSearchSubmit)}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: searchBox,
    });
    register("keyword");
  }, [navigation]);
  //console.log(watch());
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        {loading ? (
          <SearchingContainer>
            <ActivityIndicator size={30} />
            <Searching>검색중입니다...</Searching>
          </SearchingContainer>
        ) : null}
        {!called ? (
          <SearchingContainer>
            <Searching>검색어를 입력하여 주세요.</Searching>
          </SearchingContainer>
        ) : null}
        {data?.searchPhotos !== undefined &&
          data?.searchPhotos?.length === 0 && (
            <SearchingContainer>
              <Searching>아무것도 찾지 못하였습니다.</Searching>
            </SearchingContainer>
          )}
      </View>
    </DismissKeyboard>
  );
};

export default Search;
