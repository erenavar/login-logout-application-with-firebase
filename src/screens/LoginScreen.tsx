import { SafeAreaView, StyleSheet, Image, View, TextInput, Pressable, Text } from 'react-native'
import React, { FC, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../utils/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: FC<Props> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require("../../assets/login-symbol.png")}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='E-Mail' />
                <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry />
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}>Login</Text>
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        alignItems: "center"
    },
    image: {
        height: 200,
        width: 200
    },
    inputContainer: {
        flex: 2,
        padding: 20
    },
    input: {
        padding: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.primaryColor,
        marginBottom: 20
    },
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