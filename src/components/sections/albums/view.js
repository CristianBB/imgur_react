import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator, Text} from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from './styles'
import commonStyles from '../../../commons/styles';
import * as colors from '../../../commons/colors';
import { AlbumCell  } from '../../widgets/'
import { connect } from 'react-redux'
import * as AlbumsActions from '../../../redux/albums/actions'
import ActionButton from 'react-native-action-button';

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
            <View style={commonStyles.activityIndicator}>
                <ActivityIndicator size={'large'} color={colors.activityIndicator} animating={true} />
            </View>
        )
    }
    _renderNoAlbums() {
        if(this.props.isFetching || this.props.list.length !== 0) {
            return null
        }
        return (
            <View style={styles.noAlbumContainer}>
                <Text style={styles.label}>¡ Aún no existe ningún Álbum !</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    style={styles.flatListContainer}
                    data={this.props.list}
                    renderItem={ value => this._renderItem(value) }
                    keyExtractor={ (item, i) => 'cell' + item.id }
                    extraData={this.props}
                    numColumns={2}
                />

                { this._renderNoAlbums() }

                <ActionButton
                    buttonColor={colors.floatingButton}
                    onPress={() => Actions.editAlbum({isEdit: false, title: 'Nuevo Álbum'})}
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
            dispatch(AlbumsActions.fetchAlbums());
        },
        onAlbumTapped: (album) => {
            dispatch(AlbumsActions.setItem(album));
            Actions.images({ title: album.title });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums)