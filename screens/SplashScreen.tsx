import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Platform} from 'react-native';
import * as SecureStore from "expo-secure-store";
import Cookies from "js-cookie";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from "../utils/types";
import Lottie from "lottie-react-native";

const SplashScreen = ({navigation}: NativeStackScreenProps<RootStackParamList, 'SplashScreen'>) => {
    const animationProgress = useRef(new Animated.Value(0))

    useEffect(() => {
        const checkAuthentication = async () => {
            if (Platform.OS === 'web') {
                return Cookies.get('JWT');
            } else {
                return await SecureStore.getItemAsync('JWT');
            }
        };
        Animated.timing(animationProgress.current, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: false
            },
        ).start(() => {
            checkAuthentication().then((res) => {
                navigation.replace(res === null || res === undefined ? 'Auth' : 'App');

            });
        });
    }, []);

    return (
        <Lottie source={require('../assets/splashscreen.json')} autoPlay/>

    );
};

export default SplashScreen;
