import * as types from './types'

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

export function postAlbumImage(data) {
    return (dispatch, getState, api) => {

    }
}