import { StyleSheet } from 'react-native'
import * as colors from '../../../commons/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground
    },
    image: {
        width: '100%',
        height: 200,
        flex: 2,
    },
    dataContainer: {
        flex: 1,
        padding: 20,
        flexDirection: 'column'
    },
    titleLabel: {
        color: colors.primaryText,
    },
    inputLabel: {
        color: colors.secondaryText,
    },
})