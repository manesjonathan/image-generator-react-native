import {InitPaymentSheetResult, PresentPaymentSheetResult} from "@stripe/stripe-react-native";
import {Alert, Platform} from "react-native";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import axios from "axios/index";
import {URL} from "../../../utils/config";
import {PresentOptions, SetupParams} from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";

export const initiatePayment = (p: {
    presentPaymentSheet: (options?: (PresentOptions | undefined)) => Promise<PresentPaymentSheetResult>;
    initPaymentSheet: (params: SetupParams) => Promise<InitPaymentSheetResult>;
    setLoading: (loading: boolean) => void;
}) => {

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
        p.setLoading(true);
        const {
            paymentIntent,
            ephemeralKey,
            customer,

        } = await fetchPaymentSheetParams();

        await p.initPaymentSheet({
            returnURL: 'myapp://stripe-redirect',
            merchantDisplayName: "Image Generator",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
        });
    };

    const openPaymentSheet = async () => {
        const {error} = await p.presentPaymentSheet();
        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your quota has been refilled.');
        }
    };

    initializePaymentSheet().then(() => {
            openPaymentSheet().then((message) => {
                p.setLoading(false);
                return message;
            });
        }
    );
};
