import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Button from '../components/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: FC<Props> = () => {
  const logOut = () => {
    signOut(auth)
  }
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title='Log Out' onPress={logOut} backgroundColor="red" />
    </View>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 }
})