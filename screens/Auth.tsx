import React from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Auth = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                name="Login"
                component={Login as any}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Register"
                component={Register as any}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

export default Auth;
