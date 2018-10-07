import { StyleSheet } from 'react-native'
import * as colors from '../../../commons/colors';

export default StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: colors.mainBackground,
    },
    flatListContainer: {
        borderRadius: 20,
    },
    noAlbumContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    label: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.primaryText,
    }
})