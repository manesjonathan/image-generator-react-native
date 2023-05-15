import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type RootStackParamList = {
    SplashScreen: undefined;
    Auth: undefined;
    Login: undefined;
    DrawerNavigationRoutes: undefined;
};

export type SplashScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'SplashScreen'
>;

export type AuthProps = NativeStackScreenProps<
    RootStackParamList,
    'Auth'
>;

export type DrawerNavigationRoutesProps = NativeStackScreenProps<
    RootStackParamList,
    'DrawerNavigationRoutes'
>;

export type DrawerParamList = {
    Home: undefined;
    Profile: undefined;
}

export type HomeProps = NativeStackScreenProps<
    DrawerParamList,
    'Home'
>;

export type ProfileProps = NativeStackScreenProps<
    DrawerParamList,
    'Profile'
>;
