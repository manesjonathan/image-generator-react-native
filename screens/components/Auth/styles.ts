import {Platform, StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: Platform.OS === 'web' ? '100vh' : '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#ffffff",
        marginBottom: 30,
        textAlign: "center"
    },
    inputView: {
        backgroundColor: "rgba(70,88,129,0.85)",
        borderRadius: 15,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    credentials: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        fontSize: 10,
    },
    inputText: {
        height: 50,
        color: "white",
    },
    forgot: {
        marginTop: 10,
        color: "black",
    },
    loginBtn: {
        backgroundColor: "#f97316",
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10
    },
    loginText: {
        color: "white",
    },
    googleButton: {
        marginTop: 30,
    },
    error: {
        color: 'red',
        marginTop: -25,
        marginBottom: 10,
        padding: 10,
    }
});
