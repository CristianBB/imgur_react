import React, {Component} from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux'
import {Albums, Images, ImageDetail, EditAlbum} from "./sections/";
import * as api from '../api/'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from '../redux/'
const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

const sceneDefaultStyles = {
    navigationBarStyle: { backgroundColor: 'rgb(24,24,24)'},
    backButtonTintColor: 'white',
    backButtonTextStyle: { color: 'white' },
    titleStyle: { color: 'white' },
};

const editAlbumButton = props => (
    <TouchableOpacity style={{padding: 10}} onPress={ () => Actions.editAlbum({isEdit: true}) }>
        <Text style={{color: 'red', fontWeight: 'bold'}}>{'Editar'}</Text>
    </TouchableOpacity>
);

export default class App extends Component<Props> {

    componentWillMount() {
        api.configureAxios();
        StatusBar.setBarStyle('light-content')
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Stack key="root">
                        <Scene
                            key="albums"
                            component={Albums}
                            hideNavBar={true}
                            initial={true}
                        />
                        <Scene
                            key="images"
                            component={Images}
                            renderRightButton={editAlbumButton()}
                            {...sceneDefaultStyles}
                        />
                        <Scene
                            key="imageDetail"
                            component={ImageDetail}
                            {...sceneDefaultStyles}
                        />
                        <Scene
                            key="editAlbum"
                            component={EditAlbum}
                            {...sceneDefaultStyles}
                        />
                    </Stack>
                </Router>
            </Provider>
        );
    }
}
