import axios from "axios";
import {URL} from "./config";
import * as SecureStore from "expo-secure-store";
import {Platform} from "react-native";
import Cookies from "js-cookie";
import {GoogleResponse} from "./interfaces";

const header = {
    headers: {
        "Content-Type": "application/json",
    }
};

export const login = async (email: string, password: string): Promise<string> => {
    return axios.post(URL + "/Auth/login", {
        email: email,
        password: password
    }, header)
        .then((res) => {
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
    }, header)
        .then((res) => {
        return res.data.token;
    }).catch((err) => {
            console.log(err);
        }
    );
};

export const googleSignIn = async (response: GoogleResponse): Promise<string> => {
    return axios.post(URL + '/Auth/google-signin', response, header)
        .then((res) => {
        return res.data.token;
    });
};

export const googleSignOut = async () => {
    try {
        if (Platform.OS === 'web') {
            Cookies.remove('JWT');
        } else {
            await SecureStore.deleteItemAsync('JWT');
        }
    } catch (error) {
        console.error(error);
    }
};


