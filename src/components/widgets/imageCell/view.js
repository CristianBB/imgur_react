import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles'

export default class extends Component {

    static defaultProps = {
        image: null,
        onImagePress: () => {},
    };

    render() {
        const { image } = this.props;
        const title = image && image.title ? image.title : 'No Title';
        const imageLink = image && image.link ? { uri: image.link } : require('../../../resources/placeholder.png');

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => this.props.onImagePress(image)}>
                <View style={styles.imageContainer}>
                    <Image source={imageLink} style={styles.image} resizeMode={'cover'}/>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}