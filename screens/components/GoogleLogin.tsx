import React from "react";
import {Platform} from "react-native";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import {googleSignin} from "../../utils/api";
import {WEB_CLIENT_ID} from "../../utils/config";
import * as WebBrowser from "expo-web-browser";
import {GoogleSignin, GoogleSigninButton} from "@react-native-google-signin/google-signin";

WebBrowser.maybeCompleteAuthSession();

type GoogleSigninProps = {
    navigation: any
};

const GoogleLogin = ({navigation}: GoogleSigninProps) => {
    GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
    });

    const handleGoogleSigning = async () => {
        try {
            let signinData = await GoogleSignin.signIn();
            googleSignin(signinData).then(async res => {
                    if (Platform.OS === 'web') {
                        Cookies.set('JWT', res);
                    } else {
                        await SecureStore.setItemAsync('JWT', JSON.stringify(res));
                    }
                    navigation.replace('App');
                }
            );
        } catch (error) {
            console.log('Google Sign-In Error:', error);
        }
    }
    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSigning}
        />
    )
}
export default GoogleLogin;
