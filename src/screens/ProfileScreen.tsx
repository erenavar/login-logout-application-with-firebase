import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useReducer, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Button from '../components/Button';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import Input from '../components/Input';


type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: FC<Props> = () => {
  const logOut = () => {
    signOut(auth)
  }
  const auth = getAuth();
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || "");
  const [photoURL, setphotoURL] = useState(auth.currentUser?.photoURL || "")



  const update = async () => {

    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL
        })
      } catch (error) {
        console.log('error :>> ', error);
      }

    }
  }
  const changeDisplayName = (value: string) => {
    setDisplayName(value)
  }

  const changePhotoURL = (value: string) => {
    setphotoURL(value)
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Input value={auth.currentUser.email || ""} />
        <Input value={displayName} onChangeText={text => setDisplayName(text)} />
        <Input value={photoURL} onChangeText={text => setphotoURL(text)} autoCapitalize='none' />
      </ScrollView>
      <Button title='Update' onPress={update} />
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