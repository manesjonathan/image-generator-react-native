import React, {useState} from 'react';
import {ImageBackground, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {register} from '../../../utils/api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../utils/types';
import {styles} from "./styles";
import GoogleLogin from "../GoogleLogin";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";

export const Register = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Register'>) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] =
        useState<string | null>(null);

    const handleRegister = () => {
        if (!email) {
            setEmailError('Please enter your email');
            return;
        }
        if (!password) {
            setPasswordError('Please enter your password');
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords does not match');
            return;
        }

        register(email, password).then(async res => {
            if (res === null) {
                return;
            }
            if (Platform.OS === 'web') {
                Cookies.set('JWT', res!)
            } else {
                await SecureStore.setItemAsync('JWT', JSON.stringify(res));
            }
            navigation.replace('App');
            setEmail("");
            setPassword("");
        });
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/bg.webp')}
            style={styles.container}
            resizeMode="cover">
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.logo}>Image Generator</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        autoCapitalize="none"
                        placeholder={emailError ? emailError : 'Email...'}
                        placeholderTextColor={styles.inputText.color}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        autoCapitalize="none"
                        placeholder={passwordError ? passwordError : 'Password...'}
                        placeholderTextColor={styles.inputText.color}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        autoCapitalize="none"
                        placeholder={
                            confirmPasswordError ? confirmPasswordError : 'Confirm Password...'
                        }
                        placeholderTextColor={styles.inputText.color}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
                    <Text style={styles.loginText}>REGISTER</Text>
                </TouchableOpacity>
                <View style={styles.credentials}>
                    <Text style={styles.forgot} onPress={() => navigation.replace('Login')}>
                        Already have an account?
                    </Text>
                </View>
                <TouchableOpacity>
                    <GoogleLogin navigation={navigation}/>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Register;
