import Icon from 'react-native-vector-icons/FontAwesome';
import IconSettings from 'react-native-vector-icons/Feather';
import IconGallery from 'react-native-vector-icons/Entypo';
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeComponent from "./components/HomeScreen/Home";
import GalleryComponent from "./components/HomeScreen/Gallery";
import ProfileComponent from "./components/HomeScreen/Settings";

const Tabs = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <Tabs.Navigator initialRouteName="HomeScreen" screenOptions={{
            tabBarStyle: {
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            },
        }}>
            <Tabs.Screen name="Home" component={HomeComponent} options={{
                tabBarIcon: () => (
                    <Icon name={'home'} size={20} />
                )
            }}/>
            <Tabs.Screen name="Gallery" component={GalleryComponent as any} options={{
                tabBarIcon: () => (
                    <IconGallery name={'images'} size={20} />
                )
            }}/>
            <Tabs.Screen name="Settings" component={ProfileComponent as any} options={{
                tabBarIcon: () => (
                    <IconSettings name={'settings'} size={20} />
                )
            }}/>
        </Tabs.Navigator>
    );
};

export default HomeScreen;
