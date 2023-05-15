import {Button, View} from "react-native";
import React from "react";
import {logout} from "../../../utils/api";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../utils/types";

const Settings = ({navigation}: NativeStackScreenProps<RootStackParamList, 'Login'>) => {
    return (
        <View>
            <Button title={"Logout"} onPress={() => {
                logout().then(() => {
                        navigation.replace('Auth');
                    }
                );
            }}/>
        </View>
    )
}

export default Settings;
