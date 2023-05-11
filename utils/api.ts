import axios from "axios";
import {URL} from "./config";
import {AccessTokenRequest} from "../interfaces/GoogleAuth";
import {TokenResponse} from "expo-auth-session";

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
    }).catch((err) => {
            console.log(err);
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

export const googleSignin = async (accessToken: TokenResponse | null) => {
    return axios.post<AccessTokenRequest>(URL + '/Auth/google-signin', {accessToken}, header).then((res) => {
        return res.data;
    });
};
