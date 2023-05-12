import React, {useEffect, useState} from 'react';
import {
    ImageBackground,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {googleSignin, login} from "../utils/api";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import {ANDROID_CLIENT_ID, WEB_CLIENT_ID} from "../utils/config";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from "axios";
import {GoogleUser} from "../interfaces/GoogleUser";
import GoogleButton from 'react-google-button'

WebBrowser.maybeCompleteAuthSession();

export const Login = ({setSigned}: { setSigned: (value: boolean) => void }) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [token, setToken] = useState<string>();
    const [userInfo, setUserInfo] = useState<GoogleUser>();
    const [emailError, setEmailError] = useState<string>();
    const [passwordError, setPasswordError] = useState<string>();
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
                        if (Platform.OS === 'web') {
                            Cookies.set('JWT', res.token);
                        } else {
                            await SecureStore.setItemAsync('JWT', JSON.stringify(res.token));
                        }
                        setSigned(true);
                    });
                });

            } catch (error) {
                return;
            }
        }
    }, [response, token]);


    const handleLogin = () => {
        if (email && password) {
            login(email, password).then(async res => {
                if (res === null) {
                    return;
                }

                if (Platform.OS === 'web') {
                    Cookies.set('JWT', res!)
                }

                await SecureStore.setItemAsync('JWT', JSON.stringify(res));
                setSigned(true);
                setEmailError(undefined);
                setPasswordError(undefined);
            });
        }
    }

    return (
        <ImageBackground source={require('../assets/images/bg.webp')} style={styles.container} resizeMode="cover">
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.logo}>Image Generator</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        autoCapitalize="none"
                        placeholder={emailError ? emailError : "Email..."}
                        placeholderTextColor={styles.inputText.color}
                        onChangeText={text => setEmail(text)}/>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        autoCapitalize="none"
                        placeholder={passwordError ? passwordError : "Password..."}
                        placeholderTextColor={styles.inputText.color}
                        onChangeText={text => setPassword(text)}/>
                </View>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}
                          onPress={() => {
                              if (!email) {
                                  setEmailError('Please enter your email');
                              }
                              if (!password) {
                                  setPasswordError('Please enter your password');
                              }
                              handleLogin();
                          }}>SIGN IN
                    </Text>
                </TouchableOpacity>
                <View style={styles.credentials}>
                    <Text style={styles.forgot} onPress={() => console.log('Pressed left')}>Already an account?</Text>
                    <Text style={styles.forgot} onPress={() => console.log('Pressed right')}>Forgot Password?</Text>
                </View>
                <TouchableOpacity>
                    <TouchableOpacity style={styles.googleButton}>
                        <GoogleButton
                            title="Sign in with Google"
                            type={'light'}
                            disabled={!request}
                            onClick={async () => {
                                await promptAsync()
                            }}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>

    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0e0e',
        minHeight: Platform.OS === 'web' ? '100vh' : '100%'
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#ffffff",
        marginBottom: 40,
        textAlign: "center"
    },
    inputView: {
        width: "80%",
        backgroundColor: "rgba(70,88,129,0.85)",
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
