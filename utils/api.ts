import axios from "axios";
import {URL} from "./config";
import * as SecureStore from "expo-secure-store";
import {Platform} from "react-native";
import Cookies from "js-cookie";
import {Interfaces} from "./interfaces";

const header = {
    headers: {
        "Accept": "text/plain",
        "Content-Type": "application/json",
    }
};

export const login = async (email: string, password: string): Promise<string> => {
    return axios.post(URL + "/Auth/login", {
        email: email,
        password: password
    }, header).then((res) => {
        return res.data.token;
    }).catch(() => {
            return null;
        }
    );
};

export const register = async (email: string, password: string): Promise<string> => {
    return axios.post(URL + "/Auth/register", {
        email: email,
        username: email,
        password: password
    }, header).then((res) => {
        return res.data.token;
    }).catch((err) => {
            console.log(err);
        }
    );
};

export const googleSignin = async (response: Interfaces) => {
    return axios.post(URL + '/Auth/google-signin', response, header).then((res) => {
        return res.data.token;
    });
};

export const logout = async () => {
    if (Platform.OS === 'web') {
        Cookies.remove('JWT');
        Cookies.remove('user_id')
    } else {
        await SecureStore.deleteItemAsync('JWT');
        await SecureStore.deleteItemAsync('user_id');
    }
}


