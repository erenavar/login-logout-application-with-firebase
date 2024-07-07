import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../utils/colors'

interface Props {
    title: string,
    onPress: () => void
}

const Button: FC<Props> = ({ title, onPress }) => {
    return (
        <Pressable style={styles.btn} onPress={onPress}>
            <Text style={styles.btnText}>{title}</Text>
        </Pressable>
    )
}

export default Button;

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        backgroundColor: colors.primaryColor,
        borderRadius: 10,
        marginBottom: 20
    },
    btnText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    }

})