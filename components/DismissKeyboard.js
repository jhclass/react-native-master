import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, backgroundColor: "#000" }}
      onPress={() => {
        //alert("a");
        Keyboard.dismiss();
      }}
      disabled={Platform.OS === "web"}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};
export default DismissKeyboard;
