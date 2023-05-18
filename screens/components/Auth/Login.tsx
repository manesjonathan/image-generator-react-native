import React, {useState} from 'react';
import {Button, ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {login, setCookies} from "../../../utils/api";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../../../utils/types";
import {styles} from "./styles";
import GoogleLogin from "./GoogleLogin";
import {Formik, FormikValues} from 'formik';
import {RootSiblingParent} from "react-native-root-siblings";
import Toast from 'react-native-root-toast';

export const Login = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Login'>) => {
    const [emailError, setEmailError] = useState<string>();
    const [passwordError, setPasswordError] = useState<string>();

    const handleLogin = (values: FormikValues) => {
        if (values.email === '') {
            setEmailError('Please enter your email');
            return;
        }
        if (values.password === '') {
            setPasswordError('Please enter your password');
            return;
        }
        login(values.email, values.password).then(async res => {
            if (res === null) {
                Toast.show('Your email or password is incorrect', {
                    duration: Toast.durations.LONG,
                });
                return;
            }
            await setCookies(res, values.email, navigation);
        });
    }

    return (
        <RootSiblingParent>
            <ImageBackground source={require('../../../assets/images/bg.webp')} style={styles.container}
                             resizeMode="cover">
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={values => handleLogin(values)}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View>
                            <Text style={styles.logo}>Image Generator</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.inputText}
                                    autoCapitalize="none"
                                    placeholder={emailError ? emailError : "Email..."}
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
                                    placeholder={passwordError ? passwordError : "Password..."}
                                    placeholderTextColor={styles.inputText.color}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                />
                            </View>
                            <Button color={"#f97316"} onPress={() => {
                                handleSubmit();
                            }} title="LOGIN"/>

                            <View style={styles.credentials}>
                                <Text style={styles.forgot} onPress={() => navigation.replace('Register')}> Create an
                                    account</Text>
                            </View>
                            <TouchableOpacity>
                                <GoogleLogin navigation={navigation}/>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ImageBackground>
        </RootSiblingParent>
    );
}

export default Login;
