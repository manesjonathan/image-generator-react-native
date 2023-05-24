import React, {useEffect} from "react";
import {Button, View} from "react-native";
import {googleSignIn} from "../../../utils/api";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";
import {styles} from "../../../utils/styles";
import {SET_COOKIES} from "../../../utils/apiService";
import {ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID} from "@env"


WebBrowser.maybeCompleteAuthSession();
type GoogleSigningProps = {
    navigation: any,
    setLoading: any
};
const GoogleLogin = ({navigation, setLoading}: GoogleSigningProps) => {

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        webClientId: WEB_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
    });

    useEffect(() => {

        if (response?.type === "success" && response.authentication !== null) {
            getUserInfo(response.authentication.accessToken);
        } else {

        }
    }, [response]);

    const getUserInfo = (token: string) => {
        setLoading(true);
        try {
            axios.get(
                'https://www.googleapis.com/userinfo/v2/me',
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            ).then((res) => {
                let email = res.data.email;
                googleSignIn(res.data).then(async res => {
                    setLoading(false);
                    await SET_COOKIES(res, email, navigation);
                });
            });

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
