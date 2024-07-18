import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IProduct } from "./types";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, TabParamList } from "../../navigation/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { width } from "../../utils/constants";
import Button from "../../components/Button";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

type ProductDetailNavigationType = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Products">,
  NativeStackScreenProps<RootStackParamList>
>;

const RenderProduct = ({
  item,
  onDelete,
}: {
  item: IProduct;
  onDelete: (id: string) => void;
}) => {
  const navigation = useNavigation<ProductDetailNavigationType["navigation"]>();
  const toProductDetail = () => {
    navigation.navigate("ProductDetail", { id: item.id });
  };

  const updateItem = () => {
    navigation.navigate("AddProduct", { id: item.id });
  };

  return (
    <Pressable style={styles.container} onPress={toProductDetail}>
      <Image source={{ uri: item.imageURL }} style={styles.image} />
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={{ fontSize: 15 }}>${item.price}</Text>
      <View style={styles.itemButtons}>
        <Button title="Delete" onPress={() => onDelete(item.id)}></Button>
        <Button title="Update" onPress={() => updateItem()}></Button>
      </View>
    </Pressable>
  );
};

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
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 8,
  },
  image: {
    height: itemWidth,
    width: itemWidth,
  },
  itemButtons: {
    flexDirection: "row",
    gap: 5,
    paddingTop: 10,
  },
});
