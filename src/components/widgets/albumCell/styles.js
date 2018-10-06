import { StyleSheet, Dimensions } from 'react-native'
import * as colors from '../../../commons/colors';

export default StyleSheet.create({
    cellContainer: {
        width: '47%',
        backgroundColor: colors.mainBackground,
        margin: 5,
        borderRadius: 10,
    },
    albumContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    titleContainer: {
        backgroundColor: colors.sectionContainer,
        padding: 10,
    },
    titleLabel: {
        color: colors.primaryText,
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        height: 200,
    }
})