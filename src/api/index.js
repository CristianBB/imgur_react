import axios from 'axios'
import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from 'react-native-dotenv'
import { AsyncStorage } from 'react-native'
import {setList} from "../redux/albums/actions";

const BASE_URL = 'https://api.imgur.com';
const BODY_COMMON = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: REFRESH_TOKEN,
};

export function configureAxios() {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers.common['Authorization'] = `Client-ID ${CLIENT_ID}`;

    // TODO para pruebas, eliminar
    AsyncStorage.clear();
}

function _getAccessToken() {
    const url = '/oauth2/token';
    return axios.post(url, {...BODY_COMMON, grant_type: 'refresh_token'});
}

export function fetchAlbums() {
    let url = '/3/account/$$account_username$$/albums/';
    let username;

    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('account_username')
            .then(accountUsername => {
                if (accountUsername) {
                    username = accountUsername;
                    return Promise.resolve();
                } else {
                    return _getAccessToken();
                }
            })
            .then(res => {
                if (res) {
                    username = res.data.account_username;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;

                    let promises = [];
                    promises.push(AsyncStorage.setItem('access_token', res.data.access_token));
                    promises.push(AsyncStorage.setItem('account_id', res.data.account_id.toString()));
                    promises.push(AsyncStorage.setItem('account_username', res.data.account_username));

                    return Promise.all(promises);
                } else {
                    return Promise.resolve();
                }
            })
            .then(() => {
                url = url.replace('$$account_username$$', username);
                return axios.get(url);
            })
            .then(res => {
                resolve(res);
            })
            .catch((err) => {
                console.log('Error fetchAlbums:', err);
                reject(err);
            });
    })
}

export function fetchAlbumImages(albumHash) {
    const url = `https://api.imgur.com/3/album/${albumHash}/images`;
    return axios.get(url);
}

export function getImage(imageHash) {
    const url = `/3/image/${imageHash}`;
    return axios.get(url);
}

export function postImage(image, albumHash, name, title, description ) {
    const url = '/3/image';
    const data = {};

    if (!image) {
        return Promise.resolve()
    }

    data.image = image;
    data.album = albumHash;
    if (title) data.title = title;
    if (description) data.description = description;

    return axios.post(url, data);
}

export function deleteImage(imageHash) {
    const url = `/3/image/${imageHash}`;
    return axios.delete(url);
}

export function updateAlbum(albumHash, title, description, coverHash) {
    const url = `/3/album/${albumHash}`;

    const data = {};
    if (title) data.title = title;
    if (description) data.description = description;
    if (coverHash) data.cover = coverHash;

    return axios.put(url, data);
}

export function createAlbum(title, description, coverHash) {
    const url = '/3/album';

    const data = {
        title: title,
        description: description,
        cover: coverHash,
    };

    return axios.post(url, data);
}

export function deleteAlbum(albumHash) {
    const url = `/3/album/${albumHash}`;

    return axios.delete(url);
}