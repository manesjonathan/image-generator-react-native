import React, {useEffect, useState} from 'react';
import {Button, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {googleSignin, login} from "../utils/api";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import {ANDROID_CLIENT_ID, WEB_CLIENT_ID} from "../utils/config";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from "axios";
import {GoogleUser} from "../interfaces/GoogleAuth";

WebBrowser.maybeCompleteAuthSession();


export const Login = ({signed}: { signed: (value: boolean) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState<string>("");
    const [userInfo, setUserInfo] = useState<GoogleUser>();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        webClientId: WEB_CLIENT_ID,
        //iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication?.accessToken ?? "");
            try {
                axios.get<GoogleUser>('https://www.googleapis.com/userinfo/v2/me', {
                    headers: {Authorization: `Bearer ${token}`},
                }).then(res => {
                    setUserInfo(res.data);
                    googleSignin(userInfo).then(async res => {
                        await console.log(res);
                        if (Platform.OS === 'web') {
                            Cookies.set('JWT', res.token);
                        } else {
                            await SecureStore.setItemAsync('JWT', JSON.stringify(res.token));
                        }
                        signed(true);
                    });
                });

            } catch (error) {
                console.log(error);
            }
        }
    }, [response, token]);


    const handleLogin = () => {
        login(email, password).then(async res => {
            console.log(res);
            if (Platform.OS === 'web') {
                Cookies.set('JWT', res)

            }
            await SecureStore.setItemAsync('JWT', res);
            signed(res !== null);

        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.logo}>Todo App</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    autoCapitalize="none"
                    placeholder="Email..."
                    placeholderTextColor={styles.inputText.color}
                    onChangeText={text => setEmail(text)}/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    autoCapitalize="none"
                    placeholder="Password..."
                    placeholderTextColor={styles.inputText.color}

                    onChangeText={text => setPassword(text)}/>
            </View>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}
                      onPress={handleLogin}>SIGN IN</Text>
            </TouchableOpacity>
            <View style={styles.credentials}>
                <Text style={styles.forgot} onPress={() => console.log('Pressed left')}>Already an account?</Text>
                <Text style={styles.forgot} onPress={() => console.log('Pressed right')}>Forgot Password?</Text>
            </View>
            <TouchableOpacity>
                <Button
                    title="Sign in with Google"
                    disabled={!request}
                    onPress={() => {
                        promptAsync()
                    }}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0e0e',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Platform.OS === 'web' ? '100vh' : '100%'
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#ffffff",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 15,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    credentials: {
        flexDirection: "row",
        width: "80%",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 10,
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#f97316",
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10
    },
    loginText: {
        color: "white",
    },
    googleButton: {
        width: 192,
        height: 48,
        marginTop: 40,
    }
});
