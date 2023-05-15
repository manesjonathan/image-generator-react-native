import GoogleButton from "react-google-button";
import {styles} from "./Auth/styles";
import React from "react";
import axios from "axios";
import {Interfaces} from "../../utils/interfaces";
import {Platform} from "react-native";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import {googleSignin} from "../../utils/api";
import * as Google from "expo-auth-session/providers/google";
import {ANDROID_CLIENT_ID, WEB_CLIENT_ID} from "../../utils/config";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

type GoogleSigninProps = {
    navigation: any
};

const GoogleSignin = ({navigation}: GoogleSigninProps) => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        webClientId: WEB_CLIENT_ID,
        //iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    });

    const handleGoogleSigning = (token: string,) => {
        axios.get<Interfaces>('https://www.googleapis.com/userinfo/v2/me', {
            headers: {Authorization: `Bearer ${token}`},
        }).then(async res => {
            if (Platform.OS === 'web') {
                Cookies.set('user_id', res.data.id);
            } else {
                await SecureStore.setItemAsync('user_id', JSON.stringify(res.data.id));
            }
            googleSignin(res.data).then(async res => {
                if (Platform.OS === 'web') {
                    Cookies.set('JWT', res);
                } else {
                    await SecureStore.setItemAsync('JWT', JSON.stringify(res));
                }
                navigation.replace('DrawerNavigationRoutes');
            });
        });
    }
    return (<GoogleButton style={styles.googleButton}
                          title="Sign in with Google"
                          type={'light'}
                          disabled={!request}
                          onClick={async () => {
                              await promptAsync().then(res => {
                                  if (res.type === 'success') {
                                      handleGoogleSigning(res.params.access_token);
                                  }
                              });
                          }}
    />)
}
export default GoogleSignin;
