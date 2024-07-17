import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList,"ProductDetail">

const ProductDetailScreen: FC<Props> = ({route}) => {
    const {id} = route.params;
    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({})