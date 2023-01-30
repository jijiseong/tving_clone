import { atom } from "recoil";

export const dragState = atom({
  key: "dragState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
