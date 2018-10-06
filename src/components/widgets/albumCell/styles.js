import { StyleSheet, Dimensions } from 'react-native'
import * as colors from '../../../commons/colors';

export default StyleSheet.create({
    cellContainer: {
        width: '50%',
        height: 300,
        backgroundColor: 'rgb(173,126,255)',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 10,
        marginRight: 2
    },
    titleContainer: {
        justifyContent: 'center',
        height: '10%',
    },
    titleLabel: {
        color: colors.primaryText,
        fontSize: 22
    },
    image: {
        height: '90%',
        borderRadius: 10,
    }
})