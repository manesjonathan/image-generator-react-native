import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ImageBackground, Platform, StyleSheet} from 'react-native';

import * as SecureStore from "expo-secure-store";
import Cookies from "js-cookie";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../utils/types";

const SplashScreen = ({navigation}: NativeStackScreenProps<RootStackParamList, 'SplashScreen'>) => {
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            const checkAuthentication = async () => {
                if (Platform.OS === 'web') {
                    const value = await Cookies.get('JWT');
                    navigation.replace(value === undefined ? 'Auth' : 'App');
                } else {
                    const value = await SecureStore.getItemAsync('JWT');
                    navigation.replace(value === null ? 'Auth' : 'App');
                }
            };
            checkAuthentication();
        }, 2000);
    }, []);

    return (
        <ImageBackground source={require('../assets/images/bg.webp')} style={styles.container} resizeMode="cover">
            <ActivityIndicator
                animating={animating}
                color="#f97316"
                size="large"
                style={styles.activityIndicator}
            />
        </ImageBackground>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
