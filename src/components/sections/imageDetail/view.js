import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

class ImageDetail extends React.Component {

    render() {
        const { image } = this.props;
        const imageLink = image && image.link ? { uri: image.link } : require('../../../resources/placeholder.png');
        const description = image && image.description ? image.description : '';

        return (
            <View style={styles.container}>
                <Image source={imageLink} resizeMode={'cover'} style={[styles.image, { height: '50%' }]}/>
                <View style={styles.dataContainer}>
                    <Text style={styles.text}>{'Descripción: '}</Text>
                    <Text style={styles.text}>{description}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        image: state.images.item,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail)
