import styled, { css } from "styled-components/native";
import { colors } from "../../colors";

export const AuthEmailButton = styled.TouchableOpacity`
  margin-bottom: 20px;
  width: 100%;
  padding: 10px 0;
  background-color: ${colors.red};
  border-radius: 4px;
`;
export const AuthEmailButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`;
export const TextInputBox = styled.TextInput`
  background-color: #fff;
  width: 100%;
  padding: 15px 13px;
  font-size: 16px;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);

  ${(props) =>
    props.first &&
    css`
      margin-top: 20px;
    `}

  ${(props) =>
    props.last &&
    css`
      margin-bottom: 5px;
    `}

    ${(props) =>
    props.lastButton &&
    css`
      margin-bottom: 20px;
    `}
`;
