import * as types from './types'

const initialState = {
    isFetching: false, 
    list: [],
    item: null,
};

export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case types.ALBUMS_UPDATE_LIST:
            return {
                ...state,
                list: action.value,
            };

        case types.ALBUMS_SET_FETCHING:
            return {
                ...state,
                isFetching: action.value,
            };

        case types.ALBUMS_SET_ITEM:
            return {
                ...state,
                item: action.value,
            };

        default: 
            return state;
    }
}