import { FlatList, StyleSheet, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { RootStackParamList, TabParamList } from "../../navigation/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { IProduct } from "./types";
import { RenderProduct } from "./productListItem";
import { Header } from "../../components/Header";
import Button from "../../components/Button";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Profile">,
  NativeStackScreenProps<RootStackParamList>
>;

const ProductsScreen: FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<IProduct[]>([]);
  const isFocused = useIsFocused();
  const toAddProduct = () => {
    navigation.navigate("AddProduct");
  };
  useEffect(() => {
    if (isFocused) {
      readData();
    }
  }, [isFocused]);

  const readData = async () => {
    try {
      const products: IProduct[] = [];
      const response = await getDocs(collection(db, "products"));
      response.forEach((product) => {
        products.push({ ...(product.data() as IProduct), id: product.id });
      });
      setData(products);
    } catch (error) {
      console.log("Error on read data :>> ", error);
    }
  };

  const filterPrice = async (min: number, max: number) => {
    try {
      const q = query(
        collection(db, "products"),
        where("price", ">=", min),
        where("price", "<=", max)
      );
      const filterProducts: IProduct[] = [];
      const response = await getDocs(q);
      response.forEach((item) => {
        filterProducts.push({ ...(item.data() as IProduct), id: item.id });
      });
      setData(filterProducts);
    } catch (error) {
      console.log("Error on filter query :>> ", error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      readData();
    } catch (error) {
      console.log("Delete Error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header onPressRight={toAddProduct} />
      <Button
        title="$200 - $500"
        onPress={() => filterPrice(200, 500)}
      ></Button>
      <View style={styles.content}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <RenderProduct
              item={item}
              onDelete={(id: string) => deleteItem(id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
  },
});
