import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Auth from "./screens/Auth";
import HomeScreen from "./screens/HomeScreen";
import {Platform} from "react-native";
import SplashScreen from "./screens/SplashScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
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
    )
        ;
};

export default App;
