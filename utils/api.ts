import axios from "axios";
import {URL} from "./config";
import {GoogleUser} from "../interfaces/GoogleUser";

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

export const googleSignin = async (response: GoogleUser | undefined) => {
    console.log(response);
    return axios.post(URL + '/Auth/google-signin', response, header).then((res) => {
        return res.data;
    });
};

