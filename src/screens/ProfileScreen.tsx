import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { FC, useReducer, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "../navigation/types";
import Button from "../components/Button";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import Input from "../components/Input";

type Props = NativeStackScreenProps<TabParamList, "Profile">;

const ProfileScreen: FC<Props> = () => {
  const logOut = () => {
    signOut(auth);
  };

  const auth = getAuth();

  const [displayName, setDisplayName] = useState(
    auth.currentUser?.displayName || ""
  );
  const [photoURL, setPhotoURL] = useState(auth.currentUser?.photoURL || "");

  const update = async () => {
    if (auth.currentUser) {
      try {
        const response = await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        });
        console.log("response :>> ", response);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };
  const changeDisplayName = (value: string) => {
    setDisplayName(value);
  };

  const changePhotoURL = (value: string) => {
    setPhotoURL(value);
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {photoURL && <Image source={{ uri: photoURL }} style={styles.image} />}
        <Input value={auth.currentUser.email || ""} editable={false} />
        <Input
          value={displayName}
          onChangeText={(text) => changeDisplayName(text)}
        />
        <Input
          value={photoURL}
          onChangeText={(text) => changePhotoURL(text)}
          autoCapitalize="none"
        />
        <Input />
      </ScrollView>
      <Button title="Update" onPress={update} />
      <Button title="Log Out" onPress={logOut} backgroundColor="red" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 5,
    marginBottom: 10,
  },
});
