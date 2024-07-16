import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import { IProduct } from "./types"


const { width } = Dimensions.get("window");
const renderProduct = (item: IProduct) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.imageURL }} style={styles.image} />
            <Text style={styles.titleText}>{item.title}</Text>
            <Text>${item.price}</Text>
        </View>
    )
}

export { renderProduct };
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