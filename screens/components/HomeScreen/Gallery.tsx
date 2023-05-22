import {FlatList, Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from "react";

interface GalleryProps {
    images: string[];
}

const Gallery: React.FC<GalleryProps> = ({images}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const renderItem = ({item}: { item: string | null }) => {
        if (item) {
            return (
                <TouchableOpacity onPress={() => setSelectedImage(item)} style={gridStyles.touchableOpacity}>
                    <View style={gridStyles.item}>
                        <Image style={gridStyles.image} source={{uri: item}}/>
                    </View>
                </TouchableOpacity>
            );
        }

        return null;
    };


    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <View style={gridStyles.gallery}>
            <FlatList
                data={images}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
            />

            <Modal visible={selectedImage !== null} animationType="fade" transparent={true}>
                <TouchableOpacity style={modalStyles.overlay} onPress={closeModal}>
                    <View style={modalStyles.container}>
                        {selectedImage && (
                            <Image style={modalStyles.image} source={{ uri: selectedImage }} resizeMode="contain" />
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>

        </View>
    );
};

export default Gallery;

const gridStyles = StyleSheet.create({
    gallery: {
        justifyContent: 'space-between',
    },
    touchableOpacity: {
        flex: 1,
    },
    item: {
        flex: 1,
        margin: 2,
        aspectRatio: 1,
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
});

const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
