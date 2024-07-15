import { SafeAreaView, StyleSheet, View } from 'react-native'
import React, { FC, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import Spinner from '../components/Spinner'
import { CompositeScreenProps } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RootStackParamList, TabParamList } from '../navigation/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList, "AddProduct">,
    BottomTabScreenProps<TabParamList>>


const AddProductScreen: FC<Props> = ({ navigation }) => {
    const [state, setState] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        loader: false
    })
    const save = async () => {

        try {
            setState((prevState) => ({ ...prevState, loader: true }))
            const docRef = await addDoc(collection(db, "products"), {
                title: state.title,
                description: state.description,
                image: state.image,
                price: parseInt(state.price)
            })
            if (docRef.id) {
                navigation.goBack();
            }
        } catch (e) {
            console.log('Error adding document: ', e)
        } finally {
            setState((prevState) => ({ ...prevState, loader: false }))

        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputWrapper}>
                <Input value={state.title} placeholder='Title' onChangeText={(text) => setState((prevState) => ({ ...prevState, title: text }))} keyboardType="default" />
                <Input value={state.description} placeholder='Description' onChangeText={(text) => setState((prevState) => ({ ...prevState, description: text }))} />
                <Input value={state.image} placeholder='Image' onChangeText={(text) => setState((prevState) => ({ ...prevState, image: text }))} />
                <Input value={state.price} placeholder='Price' onChangeText={(text) => setState((prevState) => ({ ...prevState, price: text }))} keyboardType="number-pad" />
                <Button onPress={save} title='Save'></Button>
            </View>
            <Spinner visible={state.loader} />
        </SafeAreaView>
    )
}

export default AddProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputWrapper: {
        padding: 20
    }
})