import { StyleSheet } from 'react-native'
import * as colors from '../../../commons/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground,
        padding: 20,
    },
    imagePicker: {
        borderWidth: 1,
        borderRadius: 20,
        width: '100%'
    },
    image: {
        borderRadius: 20,
        width: '100%',
        height: '100%'
    },
    imageText: { 
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: '50%',
        textAlign: 'center',
        left: 0,
        right: 0,
    },
    titleContainer: {
        flex: 1,
    },
    imageContainer: {
        flex: 5,
    },
    descriptionContainer: {
        marginTop: 20,
        flex: 1,
    },
    buttonContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    }
})