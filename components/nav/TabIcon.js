import React from "react";
import { Ionicons } from "@expo/vector-icons";
export default function TabIcon({
  iconName,
  color,
  focused,
  focusedSize,
  defaultSize,
}) {
  return (
    <Ionicons
      name={iconName}
      color={color}
      size={focused ? focusedSize : defaultSize}
    />
  );
}
