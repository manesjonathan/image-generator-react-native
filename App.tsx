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
    /* const {handleURLCallback} = useStripe();
     const handleDeepLink = useCallback(
         async (url: string | null) => {
             if (url) {
                 const stripeHandled = await handleURLCallback(url);
                 if (stripeHandled) {
                     // This was a Stripe URL - you can return or add extra handling here as you see fit
                 } else {
                     // This was NOT a Stripe URL – handle as you normally would
                 }
             }
         },
         [handleURLCallback]
     );

     useEffect(() => {
         const getUrlAsync = async () => {
             const initialUrl = await Linking.getInitialURL();
             handleDeepLink(initialUrl);
         };

         getUrlAsync();

         const deepLinkListener = Linking.addEventListener(
             'url',
             (event: { url: string }) => {
                 handleDeepLink(event.url);
             }
         );

         return () => deepLinkListener.remove();
     }, [handleDeepLink]);*/

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
    );
};

export default App;
