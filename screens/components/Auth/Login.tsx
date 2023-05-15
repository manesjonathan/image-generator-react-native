import React, {useState} from 'react';
import {ImageBackground, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {login} from "../../../utils/api";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../../../utils/types";
import {styles} from "./styles";
import GoogleSignin from "../GoogleSignin";

export const Login = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Login'>) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>();
    const [passwordError, setPasswordError] = useState<string>();

    const handleLogin = () => {
        if (email && password) {
            login(email, password).then(async res => {
                if (res === null) {
                    return;
                }

                if (Platform.OS === 'web') {
                    Cookies.set('JWT', res!)
                } else {
                    await SecureStore.setItemAsync('JWT', JSON.stringify(res));
                }
                setEmail('');
                setPassword('');
            });
        }
    }

    return (
        <ImageBackground source={require('../../../assets/images/bg.webp')} style={styles.container} resizeMode="cover">
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
                    <Text style={styles.forgot} onPress={() => navigation.replace('Register')}> Create an account</Text>
                </View>
                <TouchableOpacity>
                    <GoogleSignin navigation={navigation}/>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>

    );
}

export default Login;
