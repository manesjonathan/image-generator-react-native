import {Platform} from "react-native";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";

export const SET_COOKIES = async (token: string, email: string, navigation: any) => {
    if (Platform.OS === 'web') {
        Cookies.set('JWT', token);
        Cookies.set('userEmail', email);
    } else {
        await SecureStore.setItemAsync('JWT', JSON.stringify(token));
        await SecureStore.setItemAsync('userEmail', email);
    }
    await navigation.replace('App');
}
