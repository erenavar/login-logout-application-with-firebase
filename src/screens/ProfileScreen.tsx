import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Button from '../components/Button';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import Input from '../components/Input';


type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: FC<Props> = () => {
  const logOut = () => {
    signOut(auth)
  }
  const auth = getAuth();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Input value={auth.currentUser.email || ""} />
        <Input value={auth.currentUser.displayName || ""} />
        <Input value={auth.currentUser.photoURL || ""} />
      </ScrollView>
      <Button title='Log Out' onPress={logOut} backgroundColor="red" />
    </View>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  }
})