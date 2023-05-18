import {Alert, Button, Platform, View} from "react-native";
import React, {useEffect, useState} from "react";
import {googleSignOut} from "../../../utils/api";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../utils/types";
import {useStripe} from "@stripe/stripe-react-native";
import {URL} from "../../../utils/config";
import axios from "axios";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";

const Settings = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Login'>) => {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        console.log("Fetching payment sheet params");
        const email = Platform.OS === 'web' ? Cookies.get('userEmail') : await SecureStore.getItemAsync('userEmail');
        const response = await axios.post(URL + '/create-payment-intent', {
            email: email,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const {paymentIntent, ephemeralKey, customer} = await response.data;
        await console.log("paymentIntent received");
        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,

        } = await fetchPaymentSheetParams();

        const {error} = await initPaymentSheet({
            returnURL: 'myapp://stripe-redirect',

            merchantDisplayName: "Image Generator",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'John Doe',
            }
        });
        if (!error) {
            setLoading(true);
        }
    };
    useEffect(() => {
        initializePaymentSheet();
    }, []);

    const openPaymentSheet = async () => {
        const {error} = await presentPaymentSheet();
        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your quota has been refilled.');
        }
    };
    return (
        <View>
            <Button title={"Logout"} onPress={() => {
                googleSignOut().then(() => {
                        navigation.replace('Auth');
                    }
                );
            }}/>

            <Button title={"Refill account"} onPress={() => {
                openPaymentSheet();
            }}/>
        </View>
    )
}

export default Settings;
