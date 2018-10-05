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
                onPress={ () => this.props.onAlbumPress(album) }
                style={styles.cellContainer}>

                <View style={{ justifyContent: 'center', height: '10%'}}>
                    <Text style={{color: 'white', fontSize: 22}} ellipsizeMode='tail' numberOfLines={1}>{title}</Text>
                </View>

               <Image
                    source={image}
                    style={{ height: '90%'}}
                    resizeMode={'cover'}
                />
            </TouchableOpacity>
        )
    }
}