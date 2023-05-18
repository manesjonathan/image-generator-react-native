import {Button, View} from "react-native";
import React from "react";
import {googleSignOut} from "../../../utils/api";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../utils/types";
import {initiatePayment} from "./refill";
import {useStripe} from "@stripe/stripe-react-native";

const Settings = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Settings'>) => {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();

    return (
        <View>
            <Button title={"Logout"} onPress={() => {
                googleSignOut().then(() => {
                        navigation.replace('Auth');
                    }
                );
            }}/>

            <Button title={"Refill account"} onPress={() => {
                initiatePayment({initPaymentSheet, presentPaymentSheet});
            }}/>
        </View>
    )
}

export default Settings;
