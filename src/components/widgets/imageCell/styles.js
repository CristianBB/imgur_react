import { StyleSheet } from 'react-native'
import * as colors from '../../../commons/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: colors.mainBackground,
        marginBottom: 10,
        borderRadius: 20,
    },
    imageContainer: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    detailContainer: {
        backgroundColor: colors.sectionContainer,
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        flex: 1,
        color: colors.primaryText,
    }
})