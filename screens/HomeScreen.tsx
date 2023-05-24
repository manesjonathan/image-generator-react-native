import IconSettings from 'react-native-vector-icons/Feather';
import IconGallery from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeComponent from "./components/HomeScreen/Home";
import GalleryComponent from "./components/HomeScreen/Gallery";
import SettingsComponent from "./components/HomeScreen/Settings";
import {StripeProvider} from "@stripe/stripe-react-native";
import {getImages} from "../utils/api";
import {STRIPE_PK_TEST} from "@env"

const Tabs = createBottomTabNavigator();

const HomeScreen = () => {
    const [images, setImages] = useState<string[]>([]);
    useEffect(() => {
        getImages().then(async (res) => {
            await setImages(res);
        });
    }, []);
    return (
        <StripeProvider
            publishableKey={STRIPE_PK_TEST}
            urlScheme="stripe-redirect"
            merchantIdentifier="merchant.com.manesjonathan.imagegenerator"
        >
            <Tabs.Navigator initialRouteName="HomeScreen" screenOptions={{
                tabBarStyle: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                },
            }}>
                <Tabs.Screen name="Home" options={{
                    tabBarIcon: () => (
                        <Icon name={'home'} size={20}/>
                    )
                }}>
                    {() => <HomeComponent images={images} setImages={setImages}/>}
                </Tabs.Screen>

                <Tabs.Screen
                    name="Gallery"
                    options={{
                        tabBarIcon: () => <IconGallery name={'images'} size={20}/>,
                    }}>{() => <GalleryComponent images={images}/>}
                </Tabs.Screen>

                <Tabs.Screen name="Settings" component={SettingsComponent as any} options={{
                    tabBarIcon: () => (
                        <IconSettings name={'settings'} size={20}/>
                    )
                }}/>

            </Tabs.Navigator>
        </StripeProvider>
    );
};

export default HomeScreen;
