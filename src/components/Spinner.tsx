import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Spinner = ({ visible = false }) => {
    return (
        visible
            ?
            (<View style={styles.container}>
                <ActivityIndicator color={"white"} size="large" />
            </View>)
            : null
    )
}

export default Spinner

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.6)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center"
    }
})