import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react';
import { colors } from '../../utils/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList, TabParamList } from '../../navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { IProduct } from './types';
import { RenderProduct } from './productListItem';
import { Header } from '../../components/Header';

type Props = CompositeScreenProps<BottomTabScreenProps<TabParamList, "Profile">, NativeStackScreenProps<RootStackParamList>>

const ProductsScreen: FC<Props> = ({ navigation }) => {

    const [data, setData] = useState<IProduct[]>([]);
    const isFocused = useIsFocused();
    const toAddProduct = () => {
        navigation.navigate("AddProduct")
    }
    useEffect(() => {
        if (isFocused) {
            readData();
        }
    }, [])

    const readData = async () => {
        try {
            const products: IProduct[] = [];
            const response = await getDocs(collection(db, "products"));
            response.forEach((product) => {
                console.log('product.data() :>> ', product.data());
                products.push({ ...product.data() as IProduct, id: product.id });
            });
            setData(products);
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    return (
        <View style={styles.container}>
            <Header onPressRight={toAddProduct}/>
            <View style={styles.content}>
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={({ item }) => <RenderProduct item={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    content: {
        flex: 1
    }
})