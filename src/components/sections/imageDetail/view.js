import React from 'react'
import {View, Text, Image, Animated, ScrollView} from 'react-native'
import styles from './styles'
import { connect } from 'react-redux'
import * as ImagesActions from "../../../redux/images/actions";
import Dialog from "react-native-dialog";
import Button from "../../widgets/button";

class ImageDetail extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                deleteDialogVisible: false,
                animatedOpacity: new Animated.Value(1),
            }
    }

    _deleteImageAnimation() {
        Animated.timing(
            this.state.animatedOpacity,
            {
                toValue: 0.2,
                duration: 1000,
            }
        ).start();
    }

    _showDeleteDialog = () => {
        this.setState({ deleteDialogVisible: true });
    };

    _deleteDialogConfirm = () => {
        this.props.onDeleteImage();
        this._deleteImageAnimation();
        this.setState({ deleteDialogVisible: false });
    };

    _deleteDialogCancel = () => {
        this.setState({ deleteDialogVisible: false });
    };

    render() {
        const { image } = this.props;
        const imageLink = image && image.link ? { uri: image.link } : require('../../../resources/placeholder.png');
        const description = image && image.description ? image.description : '';

        return (
            <Animated.View style={[styles.container, {opacity: this.state.animatedOpacity}]}>
                <Image source={imageLink} resizeMode={'cover'} style={[styles.image]}/>

                <View style={styles.dataContainer}>
                    <Text style={styles.titleLabel}>{'Descripción'}</Text>
                    <ScrollView>
                        <Text style={styles.descriptionLabel}>{description}</Text>
                    </ScrollView>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        label={'Eliminar'.toUpperCase()}
                        onPress={() => this._showDeleteDialog()}
                        isFetching={this.props.isFetching}
                    />
                </View>

                <Dialog.Container visible={this.state.deleteDialogVisible}>
                    <Dialog.Title>Eliminar Imagen</Dialog.Title>
                    <Dialog.Description>
                        ¿Deseas eliminar la imagen? Esta acción no puede deshacerse
                    </Dialog.Description>
                    <Dialog.Button label="Cancelar" onPress={this._deleteDialogCancel} />
                    <Dialog.Button label="Eliminar" onPress={this._deleteDialogConfirm} />
                </Dialog.Container>
            </Animated.View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.images.isFetching,
        image: state.images.item,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteImage: () => {
            dispatch(ImagesActions.deleteImage())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail)
