import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator} from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from './styles'
import { AlbumCell  } from '../../widgets/'
import { connect } from 'react-redux'
import * as AlbumsActions from '../../../redux/albums/actions'

class Albums extends Component {

    componentDidMount() {
        this.props.fetchAlbums()
    }

    _onAlbumTapped(album) {
        this.props.onAlbumTapped(album);
    }

    _renderItem({ item }) {
        return (
            <AlbumCell
                album={item}
                onAlbumPress={ v => this._onAlbumTapped(v) }
            />
        )
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
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.props.list}
                    renderItem={ value => this._renderItem(value) }
                    keyExtractor={ (item, i) => 'cell' + item.id }
                    extraData={this.props}
                    numColumns={2}
                    style={{paddingTop: 40}}
                />

                { this._renderActivityIndicator() }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.albums.isFetching,
        list: state.albums.list,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAlbums: () => {
            dispatch(AlbumsActions.fetchAlbums())
        },
        onAlbumTapped: (album) => {
            dispatch(AlbumsActions.setItem(album))
            Actions.images({ title: album.title })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums)