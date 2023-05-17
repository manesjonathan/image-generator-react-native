import React, {useState} from 'react';
import {Button, ImageBackground, Platform, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {register} from '../../../utils/api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../utils/types';
import {styles} from "./styles";
import GoogleLogin from "./GoogleLogin";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import {Formik, FormikValues} from "formik";
import Toast from "react-native-root-toast";

export const Register = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Register'>) => {
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

    const handleRegister = (values: FormikValues) => {
        if (values.email === '') {
            setEmailError('Please enter your email');
            return;
        }
        if (values.password === '') {
            setPasswordError('Please enter your password');
            return;
        }
        if (values.password !== values.confirmPassword) {
            setConfirmPasswordError('Passwords does not match');
            return;
        }

        register(values.email, values.password).then(async res => {
            if (res === null) {
                Toast.show('There is a problem with your registration', {
                    duration: Toast.durations.LONG,
                });
                return;
            }
            if (Platform.OS === 'web') {
                Cookies.set('JWT', res!)
            } else {
                await SecureStore.setItemAsync('JWT', JSON.stringify(res));
            }
            navigation.replace('App');
        });
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/bg.webp')}
            style={styles.container}
            resizeMode="cover">
            <Formik
                initialValues={{email: '', password: '', confirmPassword: ''}}
                onSubmit={values => handleRegister(values)}>{({handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                    <Text style={styles.logo}>Image Generator</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            autoCapitalize="none"
                            placeholder={emailError ? emailError : 'Email...'}
                            placeholderTextColor={styles.inputText.color}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            onChangeText={handleChange('email')}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            autoCapitalize="none"
                            placeholder={passwordError ? passwordError : 'Password...'}
                            placeholderTextColor={styles.inputText.color}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            onChangeText={handleChange('password')}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            autoCapitalize="none"
                            placeholder={confirmPasswordError ? confirmPasswordError : 'Confirm Password...'}
                            placeholderTextColor={styles.inputText.color}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                        />
                    </View>
                    <Button color={"#f97316"} onPress={() => {
                        handleSubmit();
                    }} title="REGISTER"/>
                    <View style={styles.credentials}>
                        <Text style={styles.forgot} onPress={() => navigation.replace('Login')}>
                            Already have an account?
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <GoogleLogin navigation={navigation}/>
                    </TouchableOpacity>
                </View>
            )}
            </Formik>
        </ImageBackground>
    );
};

export default Register;
