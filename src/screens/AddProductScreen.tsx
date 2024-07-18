import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Spinner from "../components/Spinner";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList, TabParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IProduct } from "./Product/types";

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, "AddProduct">,
  BottomTabScreenProps<TabParamList>
>;

const AddProductScreen: FC<Props> = ({ navigation, route }) => {
  const id = route.params?.id;
  const [state, setState] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    loader: false,
  });

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    if (id) {
      try {
        const response = await getDoc(doc(db, "products", id));
        if (response.exists) {
          const data = response.data() as IProduct;
          setState({
            title: data.title,
            price: data.price.toString(),
            image: data.image,
            description: data.description,
            loader: false,
          });
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };

  const save = async () => {
    try {
      setState((prevState) => ({ ...prevState, loader: true }));
      const docRef = await addDoc(collection(db, "products"), {
        title: state.title,
        description: state.description,
        image: state.image,
        price: parseInt(state.price),
      });
      if (docRef.id) {
        navigation.goBack();
      }
    } catch (e) {
      console.log("Error adding document: ", e);
    } finally {
      setState((prevState) => ({ ...prevState, loader: false }));
    }
  };

  const update = async () => {
    setState((prevState) => ({ ...prevState, loader: true }));
    try {
      const updateRef = doc(db, "products", id!);
      await updateDoc(updateRef, {
        title: state.title,
        description: state.description,
        image: state.image,
        price: state.price,
      });
      setState((prevState) => ({ ...prevState, loader: false }));
      navigation.goBack();
    } catch (error) {
      console.log("deneme :>> ", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputWrapper}>
        <Input
          value={state.title}
          placeholder="Title"
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, title: text }))
          }
          keyboardType="default"
        />
        <Input
          value={state.description}
          placeholder="Description"
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, description: text }))
          }
        />
        <Input
          value={state.image}
          placeholder="Image"
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, image: text }))
          }
        />
        <Input
          value={state.price}
          placeholder="Price"
          onChangeText={(text) =>
            setState((prevState) => ({ ...prevState, price: text }))
          }
          keyboardType="number-pad"
        />

        <Button onPress={save} title="Save"></Button>
        <Button onPress={update} title="Update"></Button>
      </View>
      <Spinner visible={state.loader} />
    </SafeAreaView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    padding: 20,
  },
});
