import React, {Component} from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Spinner from 'react-native-spinkit'
import styles from './styles'
import * as colors from '../../../commons/colors'

export default class extends Component {

    static defaultProps = {
        label: 'Guardar',
        isPrimaryButton: true,
        onPress: () => {},
        isFetching: false,
    };

    _onPress() {
        if(!this.props.isFetching) {
            this.props.onPress()
        }
    }

    _renderContent() {
        if(this.props.isFetching) {
            return <Spinner color={colors.activityIndicator} size={20} type={'ChasingDots'} />
        } else {
            return <Text style={styles.buttonText}>{this.props.label}</Text>
        }
    }

    render() {
        return (
            <TouchableOpacity 
                style={[styles.buttonContainer, {backgroundColor: this.props.isPrimaryButton ? colors.primaryButton : colors.secondaryButton}]}
                onPress={ () => this._onPress() }
                activeOpacity={ this.props.isFetching ? 1 : 0.2 }
            >
                { this._renderContent() }
            </TouchableOpacity>
        )
    }
}