import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../utils/colors'

interface Props {
    title: string,
    onPress: () => void,
    backgroundColor?: string
}

const Button: FC<Props> = ({ title, onPress, backgroundColor = colors.primaryColor }) => {
    return (
        <Pressable style={StyleSheet.flatten([styles.btn, { backgroundColor }])} onPress={onPress}>
            <Text style={styles.btnText}>{title}</Text>
        </Pressable>
    )
}

export default Button;

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.95,
        shadowRadius: 3.73,
        elevation: 5
    },
    btnText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    }

})