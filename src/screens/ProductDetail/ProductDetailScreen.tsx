import { Image, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { IProduct } from "../Product/types";
import { width } from "../../utils/constants";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

const ProductDetailScreen: FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState<IProduct>()
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const response = await getDoc(doc(db, "products", id));
      if(response.exists){
        setProduct(response.data() as IProduct)
      }
    } catch (error) {
        console.log('error :>> ', error);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={{uri: product?.imageURL}} style={styles.image}/>
      <Text>{product?.title}</Text>
      <Text>{product?.price}</Text>
      <Text>{product?.description}</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container : {
        flex:1
    },
    image:{
        height:width,
        width:width
    }
});
