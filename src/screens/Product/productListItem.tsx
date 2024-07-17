import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native"
import { IProduct } from "./types"
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, TabParamList } from "../../navigation/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";


const { width } = Dimensions.get("window");

type ProductDetailNavigationType = CompositeScreenProps<BottomTabScreenProps<TabParamList, "Products">, NativeStackScreenProps<RootStackParamList>>

const RenderProduct = ({ item }: { item: IProduct }) => {

    const navigation = useNavigation<ProductDetailNavigationType["navigation"]>();
    const toProductDetail = () => {
        navigation.navigate("ProductDetail")
    }

    return (
        <Pressable style={styles.container} onPress={toProductDetail}>
            <Image source={{ uri: item.imageURL }} style={styles.image} />
            <Text style={styles.titleText}>{item.title}</Text>
            <Text>${item.price}</Text>
        </Pressable>
    )
}

export { RenderProduct };
const itemWidth = width / 2 - 16;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        width: itemWidth,
        maxWidth: itemWidth,
    },
    titleText: {
        fontWeight: 600,
        paddingVertical: 8
    },
    image: { height: itemWidth, width: itemWidth }
})