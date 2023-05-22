import axios from "axios";
import {URL} from "./config";
import * as SecureStore from "expo-secure-store";
import {Platform} from "react-native";
import Cookies from "js-cookie";
import {GoogleResponse} from "./interfaces";


export const login = async (email: string, password: string): Promise<string> => {
    console.log("Logging in");
    return axios.post(URL + "/Auth/login", {
        email: email,
        password: password
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
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
    })
        .then((res) => {
            return res.data.token;
        }).catch((err) => {
                console.log(err);
            }
        );
};

export const googleSignIn = async (response: GoogleResponse): Promise<string> => {
    return axios.post(URL + '/Auth/google-signin', response)
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

export async function generateImage(inputValue: string) {
    let token = Platform.OS === 'web' ? Cookies.get('JWT') : await SecureStore.getItemAsync('JWT');
    if (token != null) {
        token = JSON.parse(token)
    }
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios.post(URL + '/Image/generate', {
            prompt: inputValue
        }, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching image URL:", error);
    }
}

export const getImages = async () => {
    let token = Platform.OS === 'web' ? Cookies.get('JWT') : await SecureStore.getItemAsync('JWT');
    if (token != null) {
        token = JSON.parse(token)
    }
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.get(URL + '/Image/images', config).then((res) => {
        return res.data;
    });
}
