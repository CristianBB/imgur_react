import { StyleSheet } from 'react-native'
import * as colors from '../../../commons/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: colors.mainBackground,
        marginVertical: 1
    },
    image: {
        width: '100%',
        height: 200,
    },
    detailContainer: {
        backgroundColor: colors.sectionContainer,
        flexDirection: 'row',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        flex: 1,
        color: colors.primaryText,
    }
})