import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react';
import { Feather } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList, TabParamList } from '../navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const HEADER_HEIGHT = Platform.OS == "ios" ? 44 : 56;
type Props = CompositeScreenProps<BottomTabScreenProps<TabParamList, "Profile">, NativeStackScreenProps<RootStackParamList>>

const ProductsScreen: FC<Props> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const navigateToAddProduct = () => {
        navigation.navigate("AddProduct")
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