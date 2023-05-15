import React from "react";
import Login from "./screens/Login";
import Home from "./screens/Home";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import SplashScreen from "./screens/SplashScreen";
import Profile from "./screens/Profile";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

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

const HomeScreen = () => {
    return (
        <Tabs.Navigator initialRouteName="HomeScreen">
            <Tabs.Screen name="HomeScreen" component={Home}/>
            <Tabs.Screen name="ProfileScreen" component={Profile as any}/>
        </Tabs.Navigator>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen as any}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="DrawerNavigationRoutes"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
