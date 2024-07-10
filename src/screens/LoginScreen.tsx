import { SafeAreaView, StyleSheet, Image, View, TextInput, Pressable, Text, ActivityIndicator } from 'react-native'
import React, { FC, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { colors } from '../utils/colors';
import { auth } from '../../firebaseConfig';
import Input from '../components/Input';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("eren@eren.com");
    const [password, setPassword] = useState("123456")
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
                <Input value={email} onChangeText={setEmail} placeholder='E-Mail' autoCapitalize='none' />
                <Input value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry />
                <Button title='Login' onPress={login} />
                <Button title='Sign Up' onPress={register} />

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
    }
})