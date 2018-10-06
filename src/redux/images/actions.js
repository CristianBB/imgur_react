import * as types from './types'
import {Actions} from "react-native-router-flux";
import {fetchAlbums} from "../albums/actions";

function setFetching(value) {
    return {
        type: types.IMAGES_SET_FETCHING,
        value: value,
    }
}

export function setList(value) {
    return {
        type: types.IMAGES_UPDATE_LIST,
        value,
    }
}

export function setItem(value) {
    return {
        type: types.IMAGES_SET_ITEM,
        value,
    }
}

export function fetchAlbumImages() {
    return (dispatch, getState, api) => {
        const album = getState().albums.item;
        if(!album) return;

        dispatch(setList([]));
        dispatch(setFetching(true));
        
        api.fetchAlbumImages(album.id)
            .then( res => {
                dispatch(setFetching(false));
                dispatch(setList(res.data.data));
            }).catch( err => {
                dispatch(setFetching(false));
                console.log("fetchAlbumImages err: ", err)
            })

    }
}

export function createImage(data) {
    return (dispatch, getState, api) => {
        const album = getState().albums.item;

        if (!album) return;

        dispatch(setFetching(true));

        api.postImage(data.image, album.id, null, data.title, data.description)
            .then(res => {
                dispatch(setFetching(false));
                dispatch(fetchAlbumImages());
                Actions.popTo('images');
            })
            .catch(err => {
                dispatch(setFetching(false));
                console.log("createImage error: ", err)
            })

    }
}