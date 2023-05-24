import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="App"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
