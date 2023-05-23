import {ActivityIndicator, Button, StyleSheet, Text, View} from "react-native";
import React from "react";
import {googleSignOut} from "../../../utils/api";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../utils/types";
import {initiatePayment} from "./refill";
import {useStripe} from "@stripe/stripe-react-native";

interface SettingsProps extends NativeStackScreenProps<RootStackParamList, 'Settings'> {
    userEmail: string;
}

const Settings: React.FC<SettingsProps> = ({navigation}) => {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [loading, setLoading] = React.useState(false);

    const handleLogout = () => {
        googleSignOut().then(() => {
            navigation.replace('Auth');
        });
    };

    const handleRefillAccount = () => {
        initiatePayment({initPaymentSheet, presentPaymentSheet, setLoading});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>You can refill your account here!</Text>
            <View style={styles.buttonContainer}>
                <Button title="1€ / 5 queries" onPress={handleRefillAccount}/>
            </View>
            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#f97316"/>
            ) : (
                <View style={styles.logoutButton}>
                    <Button title="Logout" onPress={handleLogout}/>
                </View>)}
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    logoutButton: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    loader: {
        marginTop: 20,
    },
});
