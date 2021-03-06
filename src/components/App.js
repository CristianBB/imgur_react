import React, {Component} from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux'
import {Albums, Images, ImageDetail, EditAlbum, NewImage} from "./sections/";
import * as api from '../api/'
import * as colors from '../commons/colors';

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
    navigationBarStyle: { backgroundColor: colors.navigationBar},
    backButtonTintColor: colors.primaryText,
    backButtonTextStyle: { color: colors.primaryText },
    titleStyle: { color: colors.primaryText },
};

const editAlbumButton = props => (
    <TouchableOpacity style={{padding: 10}} onPress={ () => Actions.editAlbum({isEdit: true, title: 'Editar Álbum'}) }>
        <Text style={{color: colors.buttonText, fontWeight: 'bold'}}>{'Editar'}</Text>
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
                            title="Mis Albums"
                            component={Albums}
                            {...sceneDefaultStyles}
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
                        <Scene
                            key="newImage"
                            component={NewImage}
                            {...sceneDefaultStyles}
                        />
                    </Stack>
                </Router>
            </Provider>
        );
    }
}
