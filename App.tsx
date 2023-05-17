import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Auth from "./screens/Auth";
import HomeScreen from "./screens/HomeScreen";
import {Platform} from "react-native";
import SplashScreen from "./screens/SplashScreen";
import {StripeProvider} from "@stripe/stripe-react-native";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <StripeProvider
            publishableKey="pk_test_51IjwEfC1js4lodAyBRNVJ83bNJtsel67h00mea3VzENDLODQNxDERGAa9hQ9h4yptXh7ZXAnju179KJLgy2HekGd0096Mtmzjr"
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScreen">
                    {(Platform.OS !== 'web') &&
                        <Stack.Screen
                            name="SplashScreen"
                            component={SplashScreen as any}
                            options={{headerShown: false}}/>
                    }
                    <Stack.Screen
                        name="Auth"
                        component={Auth}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="App"
                        component={HomeScreen}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </StripeProvider>
    );
};

export default App;
