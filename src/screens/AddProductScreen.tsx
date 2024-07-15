import { SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input'

const AddProductScreen = () => {
    const [state, setState] = useState({
        title: "",
        description: "",
        image: "",
        price: ""
    })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputWrapper}>
                <Input value={state.title} placeholder='Title' onChangeText={(text) => setState((prevState) => ({ ...prevState, title: text }))} keyboardType="default" />
                <Input value={state.description} placeholder='Description' onChangeText={(text) => setState((prevState) => ({ ...prevState, description: text }))} />
                <Input value={state.image} placeholder='Image' onChangeText={(text) => setState((prevState) => ({ ...prevState, image: text }))} />
                <Input value={state.price} placeholder='Price' onChangeText={(text) => setState((prevState) => ({ ...prevState, price: text }))} />
            </View>
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