import React from 'react';
import {Button, ImageBackground, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {register, setCookies} from '../../../utils/api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../utils/types';
import {styles} from "./styles";
import GoogleLogin from "./GoogleLogin";
import {Formik, FormikValues} from "formik";
import Toast from "react-native-root-toast";
import {SignupSchema} from "../../../utils/FormValidationSchema";

export const Register = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Register'>) => {
    const handleRegister = (values: FormikValues) => {
        register(values.email, values.password).then(async res => {
            if (res === null || res === undefined) {
                Toast.show('There is a problem with your registration', {
                    duration: Toast.durations.LONG,
                });
                return;
            }
            await setCookies(res, values.email, navigation);
        });
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/bg.webp')}
            style={styles.container}
            resizeMode="cover">
            <Formik
                initialValues={{email: '', password: '', confirmPassword: ''}}
                validationSchema={SignupSchema}
                onSubmit={values => handleRegister(values)}>
                {({
                      errors, touched,
                      handleChange, handleBlur,
                      handleSubmit, values
                  }) => (
                    <View>
                        <Text style={styles.logo}>Image Generator</Text>
                        <View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.inputText}
                                    autoCapitalize="none"
                                    placeholder={'Email...'}
                                    placeholderTextColor={styles.inputText.color}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                />
                            </View>
                            {(errors.email && touched.email) &&
                                <Text style={styles.error}>{errors.email ? errors.email : ''}</Text>
                            }
                        </View>
                        <View>
                            <View style={styles.inputView}>
                                <TextInput
                                    secureTextEntry
                                    style={styles.inputText}
                                    autoCapitalize="none"
                                    placeholder={'Password...'}
                                    placeholderTextColor={styles.inputText.color}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                />
                            </View>
                            {(errors.password && touched.password) &&
                                <Text style={styles.error}>{errors.password ? errors.password : ''}</Text>}
                        </View>
                        <View>
                            <View style={styles.inputView}>
                                <TextInput
                                    secureTextEntry
                                    style={styles.inputText}
                                    autoCapitalize="none"
                                    placeholder={'Confirm Password...'}
                                    placeholderTextColor={styles.inputText.color}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                />
                            </View>
                            {(errors.confirmPassword && touched.confirmPassword) &&
                                <Text style={styles.error}>{errors.confirmPassword ? errors.confirmPassword : ''}</Text>
                            }
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
