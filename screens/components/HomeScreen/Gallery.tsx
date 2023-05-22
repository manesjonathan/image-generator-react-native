import {Dimensions, FlatList, Image, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {getImages} from "../../../utils/api";
import {gridStyles} from "../../../utils/styles";

const Gallery = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        getImages().then(async (res) => {
            await setImages(res);
        });
    }, []);


    const renderItem = ({ item }: { item: string }) => (
        <View style={gridStyles.item}>
            <Image style={gridStyles.image} source={{ uri: item }} />
        </View>
    );

    return (
        <View style={gridStyles.gallery}>
            <FlatList
                data={images}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
            />
        </View>
    );
};

export default Gallery;
