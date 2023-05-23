import React, {useState} from "react";
import {ActivityIndicator, Button, Image, StyleSheet, TextInput, View} from "react-native";
import {generateImage} from "../../../utils/api";

interface HomeProps {
    images: string[];
    setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const Home = ({images, setImages}: HomeProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchImageUrl = async () => {
        setLoading(true);
        generateImage(inputValue)
            .then(async (res) => {
                setImages([...images, res]);
                await setImageUrl(res);
            })
            .finally(() => setLoading(false));
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
                editable={!loading}
            />
            <Button title="Get Image" onPress={fetchImageUrl} disabled={loading}/>
            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#f97316"/>
            ) : (
                imageUrl && <Image source={{uri: imageUrl}} style={styles.image}/>
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
    loader: {
        marginTop: 20,
    },
});

export default Home;
