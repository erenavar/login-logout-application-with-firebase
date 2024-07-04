import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: FC<Props> = () => {
    return (
        <View>
            <Text>LoginScreen</Text>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})