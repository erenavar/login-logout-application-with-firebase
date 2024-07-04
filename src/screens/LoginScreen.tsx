import { SafeAreaView, StyleSheet, Image, View } from 'react-native'
import React, { FC } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: FC<Props> = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    source={require("../../assets/login-symbol.png")}
                />
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})