import {FaHome} from "react-icons/fa";
import {GrGallery} from "react-icons/gr";
import {AiFillSetting} from "react-icons/ai";
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
                    <FaHome/>
                ),
            }}/>
            <Tabs.Screen name="Gallery" component={GalleryComponent as any} options={{
                tabBarIcon: () => (
                    <GrGallery/>
                )
            }}/>
            <Tabs.Screen name="Settings" component={ProfileComponent as any} options={{
                tabBarIcon: () => (
                    <AiFillSetting/>
                )
            }}/>
        </Tabs.Navigator>
    );
};

export default HomeScreen;
