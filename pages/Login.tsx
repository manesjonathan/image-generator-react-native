import React, {useState} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {login} from "../utils/api";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";

export const Login = ({signed}: { signed: (value: boolean) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        login(email, password).then(async res => {
            console.log(res);
            if (Platform.OS === 'web') {
                Cookies.set('JWT', res)
            } else {
                await SecureStore.setItemAsync('JWT', res)
            }
            if (res) signed(true);
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
            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}
                      onPress={handleLogin}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.loginText}>Signup</Text>
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
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});
