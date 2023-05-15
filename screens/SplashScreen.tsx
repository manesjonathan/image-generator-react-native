// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ImageBackground, Platform, StyleSheet} from 'react-native';

import * as SecureStore from "expo-secure-store";
import Cookies from "js-cookie";
import {SplashScreenProps} from "../utils/types";

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            // Check if user_id is set or not
            // If not then send for Authentication
            // else send to Home Screen
            const checkAuthentication = async () => {
                if (Platform.OS === 'web') {
                    const value = await Cookies.get('user_id');
                    navigation.replace(value === undefined ? 'Auth' : 'DrawerNavigationRoutes');
                } else {
                    const value = await SecureStore.getItemAsync('user_id');
                    navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes');
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
