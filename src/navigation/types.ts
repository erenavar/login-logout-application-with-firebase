import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
    Login: undefined,
    Splash: undefined,
    AddProduct: undefined,
    ProductDetail: { id: string },
    TabNavigation: NavigatorScreenParams<TabParamList>
};

export type TabParamList = {
    Products: undefined,
    Profile: undefined,
    Cart: undefined
}