import React from "react";
import { atom } from "recoil";

export const setRefresingState = atom({
  key: "setRefresingState",
  default: false,
});
export const commentCountState = atom({
  key: "commentCountState",
  default: 0,
});
