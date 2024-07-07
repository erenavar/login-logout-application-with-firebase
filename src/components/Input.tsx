import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../utils/colors'

interface Props extends TextInputProps { };

const Input: FC<Props> = (props) => {
    return (
        <View>
            <TextInput {...props} style={StyleSheet.flatten([styles.input, props.style])} />

        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    input: {
        padding: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.primaryColor,
        marginBottom: 20
    },
})