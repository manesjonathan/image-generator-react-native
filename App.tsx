import Login from "./pages/Login";
import Home from "./pages/Home";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform, StatusBar} from "react-native";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import * as React from 'react';
import {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    useEffect(() => {
        if (Platform.OS === 'web') {
            setIsSignedIn(Cookies.get('JWT') !== undefined);
        } else {
            SecureStore.getItemAsync('JWT').then(res => {
                setIsSignedIn(res !== null);
            });
        }
    }, []);

    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor={'#0e0e0e'}/>
            {
                isSignedIn ? (
                    <Tab.Navigator>
                        <Tab.Screen name="Home" component={HomeScreen}/>
                        <Tab.Screen name="Test" component={HomeScreen}/>
                    </Tab.Navigator>
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
                    </Stack.Navigator>
                )
            }
        </NavigationContainer>
    );

    function HomeScreen() {
        return <Home/>;
    }

    function SignInScreen() {
        return <Login signed={setIsSignedIn}/>;
    }
}
