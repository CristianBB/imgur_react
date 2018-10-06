import React, { Component } from 'react'
import {View, FlatList, ActivityIndicator} from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import * as ImagesActions from '../../../redux/images/actions'
import { ImageCell } from '../../widgets/'
import { Actions } from 'react-native-router-flux'
import ActionButton from "react-native-action-button";

class Images extends Component {

    componentDidMount() {
        this.props.fetchAlbumImages()
    }

    _renderItem(item, index) {
        return <ImageCell
            image={item}
            onImagePress={v => this.props.onImageTapped(v)}
        />
    }

    _renderActivityIndicator() {
        if(!this.props.isFetching) {
            return null
        }
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
                <ActivityIndicator size={'large'} color={'white'} animating={true} />
            </View>
        )
    }

    render() {
        const { list, isFetching } = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    data={list}
                    renderItem={({ item, index}) => this._renderItem(item, index) }
                    keyExtractor={(item, i) => 'image' + item.id}
                    refreshing={this.props.isFetching}
                />
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => Actions.newImage()}
                />

                { this._renderActivityIndicator() }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.images.list,
        isFetching: state.images.isFetching
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAlbumImages: () => {
            dispatch(ImagesActions.fetchAlbumImages())
        },
        onImageTapped: (image) => {
            dispatch(ImagesActions.setItem(image));
            Actions.imageDetail({ title: image.title || 'No Title' });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Images)
