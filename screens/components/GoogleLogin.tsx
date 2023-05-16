import React, {useState} from "react";
import {Button, Platform} from "react-native";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import {googleSignIn} from "../../utils/api";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {WEB_CLIENT_ID} from "../../utils/config";

WebBrowser.maybeCompleteAuthSession();
type GoogleSigninProps = {
    navigation: any
};
const GoogleLogin = ({navigation}: GoogleSigninProps) => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: WEB_CLIENT_ID,
        webClientId: WEB_CLIENT_ID,
        iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",

    });

    const getUserInfo = async (token: string) => {
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );

            return await response.json();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button
            title="Sign in with Google"
            disabled={!request}
            onPress={() => {
                promptAsync().then((res) => {
                    if (res?.type === "success") {
                        if (res.authentication) {
                            getUserInfo(res.authentication.accessToken).then((res) => {
                                googleSignIn(res).then(async res => {
                                        if (Platform.OS === 'web') {
                                            Cookies.set('JWT', res);
                                        } else {
                                            await SecureStore.setItemAsync('JWT', JSON.stringify(res));
                                        }
                                        navigation.replace('App');
                                    }
                                );
                            });
                        }
                    }
                });
            }}
        />
    )
}
export default GoogleLogin;
