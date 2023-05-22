import {FlatList, Image, View} from 'react-native';
import React from "react";
import {gridStyles} from "../../../utils/styles";

interface GalleryProps {
    images: string[];
}

const Gallery: React.FC<GalleryProps> = ({images}) => {
    const renderItem = ({item}: { item: string }) => (
        <View style={gridStyles.item}>
            <Image style={gridStyles.image} source={{uri: item}}/>
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
