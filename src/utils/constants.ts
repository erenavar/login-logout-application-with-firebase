import { Dimensions, Platform } from "react-native";

export const {width,height} = Dimensions.get("window");
export const HEADER_HEIGHT = Platform.OS == "ios" ? 44 : 56;
