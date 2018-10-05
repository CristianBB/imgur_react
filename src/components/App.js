import React, {Component} from 'react';
import { StatusBar } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux'
import {Albums, Images} from "./sections/";
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

type Props = {};
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
                            // renderRightButton={RightButton}
                            {...sceneDefaultStyles}
                        />
                    </Stack>
                </Router>
            </Provider>
        );
    }
}
