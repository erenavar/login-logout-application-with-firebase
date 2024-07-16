import { Image, Text, View } from "react-native"
import { IProduct } from "./types"



const renderProduct = (item: IProduct) => {
    return (
        <View>
            <Image source={{ uri: item.imageURL }} style={{ height: 100, width: 100 }} />
            <Text>{item.title}</Text>
        </View>
    )
}

export { renderProduct };