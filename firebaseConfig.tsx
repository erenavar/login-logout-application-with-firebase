import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyD8CaNG5Q-lJRIXPFjubYXaYfSD4IHxf8Y",
    authDomain: "login-page-with-firebase-aa24a.firebaseapp.com",
    projectId: "login-page-with-firebase-aa24a",
    storageBucket: "login-page-with-firebase-aa24a.appspot.com",
    messagingSenderId: "1068062763791",
    appId: "1:1068062763791:web:e4b75e88349a8c8de96c7a"
};

export const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});