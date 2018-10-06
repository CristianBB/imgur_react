import React, { Component } from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import styles from './styles'

export default class extends Component {

    static defaultProps = {
        album: null,
        onAlbumPress: () => {},
    };

    render() {
        const { album } = this.props;
        const image = album.cover_link ? { uri: album.cover_link } : require('../../../resources/placeholder.png');
        const title = album.title || 'No Title';
        return (
            <TouchableOpacity
                style={styles.cellContainer}
                onPress={ () => this.props.onAlbumPress(album) }>

                <View style={styles.albumContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleLabel} ellipsizeMode='tail' numberOfLines={1}>{title}</Text>
                    </View>

                    <Image source={image} style={styles.image} resizeMode={'cover'}/>
                </View>

            </TouchableOpacity>
        )
    }
}