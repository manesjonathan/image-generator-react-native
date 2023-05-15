import {Button, Text, View} from "react-native";
import React from "react";
import {logout} from "../utils/api";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../utils/types";

const Profile = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Login'>) => {
    return (
        <View>
            <Text>Profile</Text>
            <Button title={"Logout"} onPress={() => {
                logout().then(() => {
                        navigation.replace('Auth');
                    }
                );
            }}/>
        </View>
    )
}

export default Profile;
