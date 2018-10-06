import { StyleSheet } from 'react-native'
import * as colors from '../../../commons/colors'

export default StyleSheet.create({
    label: {
        color: colors.primaryText,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    textInput: {
        color: colors.secondaryText,
        fontSize: 15,
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10
    },
})