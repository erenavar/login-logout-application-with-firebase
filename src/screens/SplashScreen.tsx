import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, "Splash">

const SplashScreen: FC<Props> = ({ navigation }) => {

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                navigation.navigate("TabNavigation", { screen: "Profile" })
            } else {
                navigation.navigate("Login")
            }
        })
    }, [])
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/icon.png")} style={styles.image} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    image: {
        height: 200,
        width: 200
    }

})