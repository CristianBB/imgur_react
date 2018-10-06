import * as types from './types'
import { AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'

function setFetching(value) {
    return {
        type: types.ALBUMS_SET_FETCHING,
        value: value
    }
}

export function setList(value) {
    return {
        type: types.ALBUMS_UPDATE_LIST,
        value,
    }
}

export function setItem(value) {
    return {
        type: types.ALBUMS_SET_ITEM,
        value
    }
}

export function fetchAlbums() {
    return (dispatch, getState, api) => {

        AsyncStorage.getItem('albumsList', (error, result) => {
            if(result && !error) {
                const albumsList = JSON.parse(result);
                dispatch(setList(albumsList))
            } else {
                dispatch(setFetching(true))
            }
        });

        let albumsList;
        api.fetchAlbums()
            .then( res => {
                const arPromises = [];

                albumsList = res.data.data;
                albumsList.forEach(album => {
                    if (album.cover) {
                        arPromises.push(api.getImage(album.cover));
                    } else {
                        arPromises.push(Promise.resolve(null));
                    }
                });
                return Promise.all(arPromises);
            })
            .then(results => {
                for (let i=0; i < results.length; i++) {
                    if (results[i]) {
                        const imageData = results[i].data.data;
                        albumsList[i].cover_link = imageData.link;
                    } else {
                        albumsList[i].cover_link = null;
                    }
                }

                dispatch(setFetching(false));
                dispatch(setList(albumsList));
                AsyncStorage.setItem('albumsList', JSON.stringify(albumsList));

                //TODO eliminar
                console.log(albumsList);
            })
            .catch( err => {
                dispatch(setFetching(false));
                console.log("fetchAlbums error: ", err)
            })
    }
}

export function updateAlbum(data) {
    return (dispatch, getState, api) => {

        dispatch(setFetching(true));

        api.postImage(data.image, data.id, 'cover_image.png', 'Cover Image', null)
            .then(res => {
                return api.updateAlbum(data.id, data.title, '', res ? res.data.data.id : null);
            })
            .then(res => {
                dispatch(setFetching(false));
                dispatch(fetchAlbums());
                Actions.popTo('albums');
            })
            .catch( err => {
                dispatch(setFetching(false));
                console.log("updateAlbum error: ", err)
            })
    }
}

export function createAlbum(data) {
    return (dispatch, getState, api) => {

        dispatch(setFetching(true));

        api.postImage(data.image, data.id, 'cover_image.png', 'Cover Image', null)
            .then(res => {
                return api.createAlbum(data.title, '', res ? res.data.data.id : null);
            })
            .then(res => {
                dispatch(setFetching(false));
                dispatch(fetchAlbums());
                Actions.popTo('albums');
            })
            .catch(err => {
                dispatch(setFetching(false));
                console.log("createAlbum error: ", err)
            })
    }
}