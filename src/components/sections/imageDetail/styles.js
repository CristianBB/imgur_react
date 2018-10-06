import { StyleSheet } from 'react-native'
import * as colors from '../../../commons/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground,
        padding: 10,
    },
    image: {
        width: '100%',
        borderRadius: 20,
        flex: 4,
    },
    dataContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'column'
    },
    titleLabel: {
        color: colors.primaryText,
        fontWeight: 'bold',
        fontSize: 16,
    },
    descriptionLabel: {
        paddingTop: 5,
        color: colors.secondaryText,
        fontSize: 15,
    },
    buttonContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})