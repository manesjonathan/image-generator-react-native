import {Platform, StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0e0e',
        minHeight: Platform.OS === 'web' ? '100vh' : '100%'
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#ffffff",
        marginBottom: 40,
        textAlign: "center"
    },
    inputView: {
        width: "80%",
        backgroundColor: "rgba(70,88,129,0.85)",
        borderRadius: 15,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    credentials: {
        flexDirection: "row",
        width: "80%",
        alignItems: "flex-end",
        fontSize: 10,
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
    },
    loginBtn: {
        width: "80%",
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

        marginTop: 40,
    }
});