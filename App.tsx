import Login from "./pages/Login";
import Home from "./pages/Home";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform} from "react-native";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import * as React from 'react';
import {useEffect, useState} from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'web') {
            setIsSignedIn(Cookies.get('JWT') !== undefined);
        } else {
            SecureStore.getItemAsync('JWT').then(res => {
                setIsSignedIn(res !== undefined);
            })
        }
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isSignedIn ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen}/>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="SignIn" component={SignInScreen}/>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );

    function HomeScreen() {
        return <Home/>;
    }

    function SignInScreen() {
        return <Login signed={setIsSignedIn}/>;
    }
}
