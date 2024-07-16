import { FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList, TabParamList } from '../../navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { IProduct } from './types';
import { renderProduct } from './productListItem';

const HEADER_HEIGHT = Platform.OS == "ios" ? 44 : 56;
type Props = CompositeScreenProps<BottomTabScreenProps<TabParamList, "Profile">, NativeStackScreenProps<RootStackParamList>>

const ProductsScreen: FC<Props> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [data, setData] = useState<IProduct[]>([]);
    const isFocused = useIsFocused();
    const navigateToAddProduct = () => {
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
            <View style={[styles.headerWrapper, { height: insets.top + HEADER_HEIGHT, paddingTop: insets.top }]}>
                <View style={styles.headerEdge}></View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Products</Text>
                </View>
                <Pressable style={styles.headerEdge} onPress={navigateToAddProduct}>
                    <Feather name="plus" size={24} color={colors.primaryColor} />
                </Pressable>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={({ item }) => renderProduct(item)}
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
    headerWrapper: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 20,
        borderBottomColor: colors.primaryColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    headerEdge: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerContainer: {
        flex: 4,
        justifyContent: "center"
    },
    headerText: {
        textAlign: "center",
        fontWeight: "bold",
        color: colors.primaryColor,
        fontSize: 20
    },
    content: {
        flex: 1
    }
})