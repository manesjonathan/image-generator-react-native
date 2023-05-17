import React, {useEffect} from "react";
import {Button, Platform, View} from "react-native";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import {googleSignIn} from "../../../utils/api";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID} from "../../../utils/config";
import axios from "axios";
import {styles} from "./styles";

WebBrowser.maybeCompleteAuthSession();
type GoogleSigningProps = {
    navigation: any
};
const GoogleLogin = ({navigation}: GoogleSigningProps) => {

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        webClientId: WEB_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === "success" && response.authentication !== null) {
            getUserInfo(response.authentication.accessToken);

        }
    }, [response]);

    const getUserInfo = (token: string) => {
        try {
            axios.get(
                'https://www.googleapis.com/userinfo/v2/me',
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            ).then((res) => {
                googleSignIn(res.data).then(async res => {
                    if (Platform.OS === 'web') {
                        Cookies.set('JWT', res);
                    } else {
                        await SecureStore.setItemAsync('JWT', JSON.stringify(res));
                    }
                    await navigation.replace('App');
                });
            })

        } catch (error) {
            console.log(error);
        }
    };

    const handlePress = async () => {
        try {
            await promptAsync();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.googleButton}>
            <Button
                title="Sign in with Google"
                disabled={!request}
                onPress={handlePress}/>
        </View>
    )
}
export default GoogleLogin;
