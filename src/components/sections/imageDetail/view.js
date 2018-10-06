import React from 'react'
import { View, Text, Image } from 'react-native'
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
            }
    }

    _showDeleteDialog = () => {
        this.setState({ deleteDialogVisible: true });
    };

    _deleteDialogConfirm = () => {
        this.props.onDeleteImage();
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
            <View style={styles.container}>
                <Image source={imageLink} resizeMode={'cover'} style={[styles.image, { height: '50%' }]}/>
                <View style={styles.dataContainer}>
                    <Text style={styles.text}>{'Descripción: '}</Text>
                    <Text style={styles.text}>{description}</Text>
                </View>

                <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
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
            </View>
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
