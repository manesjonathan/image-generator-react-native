import React, {useState} from "react";
import {Button, Image, StyleSheet, TextInput, View} from "react-native";
import {generateImage} from "../../../utils/api";

const Home = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");

    const fetchImageUrl = async () => {
        generateImage(inputValue).then(async (res) => {
            await setImageUrl(res);
        });
    };

    const handleInputChange = (text: string) => {
        setInputValue(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={handleInputChange}
                placeholder="Enter your query"
            />
            <Button title="Get Image" onPress={fetchImageUrl}/>
            {imageUrl && (
                <Image source={{uri: imageUrl}} style={styles.image}/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});

export default Home;
