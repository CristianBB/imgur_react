import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import * as ImagesActions from '../../../redux/images/actions'
import { ImageCell } from '../../widgets/'
import { Actions } from 'react-native-router-flux'

class Images extends Component {

    componentDidMount() {
        this.props.fetchAlbumImages()
    }

    _renderItem(item, index) {
        return <ImageCell
            image={item}
            onImagePress={this.props.onImageTapped()}
        />
    }

    render() {
        const { list, isFetching } = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    data={list}
                    renderItem={({ item, index}) => this._renderItem(item, index) }
                    keyExtractor={(item, i) => 'image' + item.id}
                    onRefresh={ () => this.props.fetchAlbumImages()}
                    refreshing={this.props.isFetching}
                />
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
            dispatch(ImagesActions.setItem(image))
            // Actions.characterDetail({ title: character.nombre })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Images)
