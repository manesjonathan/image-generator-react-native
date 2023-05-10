import axios from "axios";
import {URL} from "./config";
import {AuthSessionResult} from "expo-auth-session";

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

export const register = async (email: string, password: string) => {
    axios.post(URL + "/Auth/register", {
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

export const signinWithGoogle = async (idToken: AuthSessionResult) => {
    axios.post(URL + "/Auth/google-signin", {
        idToken: idToken
    }, header).then((res) => {
        return res.data.token;
    }).catch((err) => {
            console.log(err);
        }
    );
}
