import {Alert, Button, View} from "react-native";
import React, {useEffect, useState} from "react";
import {googleSignOut} from "../../../utils/api";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../utils/types";
import {useStripe} from "@stripe/stripe-react-native";
import {URL} from "../../../utils/config";

const Settings = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Login'>) => {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        console.log("Fetching payment sheet params");
        const response = await fetch(URL + '/create-payment-intent', {
            method: 'POST',
            body: JSON.stringify({'items': [{'id': "xl-tshirt"}]}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {paymentIntent, ephemeralKey, customer} = await response.json();
        await console.log(paymentIntent);
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
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
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
        console.log("Opening payment sheet");
        const {error} = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
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
