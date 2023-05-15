import React from "react";
import Login from "./components/Auth/Login";
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
        </Stack.Navigator>
    );
};

export default Auth;
