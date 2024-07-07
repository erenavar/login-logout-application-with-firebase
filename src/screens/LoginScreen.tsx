import { SafeAreaView, StyleSheet, Image, View, TextInput, Pressable, Text, ActivityIndicator } from 'react-native'
import React, { FC, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { colors } from '../utils/colors';
import { auth } from '../../firebaseConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const register = async () => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            if (response.user) {
                navigation.navigate("Profile")
            }

        } catch (error) {
            console.log('error :>> ', error);
        } finally {
            setLoading(false)
        }
    }


    const login = async () => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            if (response.user) {
                navigation.navigate("Profile")
            }

        } catch (error) {
            console.log('error :>> ', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require("../../assets/icon.png")}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='E-Mail' autoCapitalize='none' />
                <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry />
                <Pressable style={styles.btn} onPress={login}>
                    <Text style={styles.btnText}>Login</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={register}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </Pressable>

            </View>
            {loading && <ActivityIndicator />}
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