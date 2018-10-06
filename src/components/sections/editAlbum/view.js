import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { Button, TextInput } from '../../widgets/'
import styles from './styles'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import * as AlbumsActions from '../../../redux/albums/actions'
import Dialog from "react-native-dialog";

class EditAlbum extends Component {

    constructor(props) {
        super(props);

        if(props.isEdit && props.album) {
            this.state = {
                deleteDialogVisible: false,
                title: props.album.title,
                image: { preview: {uri: props.album.cover_link }},
            }
        } else {
            this.state = {
                deleteDialogVisible: false,
                title: '',
                image: null,
            }
        }

        this.options = {
            title: 'Seleccionar imagen',
            maxWidth: 640,
            maxHeight: 640,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
    }

    _validateForm() {
        const {title, image} = this.state;
        return (title && image);
    }

    _onSubmit() {
        if(this._validateForm()) {
            const {title, image} = this.state ;
            if(this.props.isEdit) {
                const albumId = this.props.album.id;
                const imageData = image.data ? { image: image.data } : {};
                const data = {
                    ...imageData,
                    title: title,
                    id: albumId,
                };
                this.props.onEditAlbum(data);
            } else {
                const data = {
                    title: title,
                    image: image.data,
                };
                this.props.onNewAlbum(data);
            }
        } else {
            Alert.alert('Atención', 'Complete todos los campos')
        }
    }

    _onImagePickerTapped() {
        ImagePicker.showImagePicker(this.options, (response) => {
            if (response.uri && response.data) {
                let preview = { uri: response.uri };
                let data = response.data;
                this.setState({
                    image: { preview, data }
                });
            }
        });
    }

    _renderTextInput(label, key, placeholder = '') {
        return (
            <TextInput
                label={label}
                value={this.state[key]}
                onChangeText={ v => this.setState({ [key]: v }) }
                placeholder={placeholder}
            />
        )
    }

    _renderImageInput() {
        const imageUri = this.state.image && this.state.image.preview && this.state.image.preview.uri ? this.state.image.preview : require('../../../resources/placeholder.png');
        const imageLabel = this.state.image ? 'Pulsa para escoger otra imagen' : 'Pulsa para elegir imagen *';
        return (
            <View style={{marginTop: 20}}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => this._onImagePickerTapped()}>
                    <Image source={imageUri} style={styles.image} resizeMode={'cover'} />
                    <Text style={styles.imageText}>{imageLabel}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderDeleteImage() {
        if (!this.props.isEdit) return;

        return (
            <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                <Button
                    label={'Eliminar'.toUpperCase()}
                    onPress={() => this._showDeleteDialog()}
                    isFetching={this.props.isFetching}
                />
            </View>
        )
    }

    _showDeleteDialog = () => {
        this.setState({ deleteDialogVisible: true });
    };

    _deleteDialogConfirm = () => {
        this.props.onDeleteAlbum();
        this.setState({ deleteDialogVisible: false });
    };

    _deleteDialogCancel = () => {
        this.setState({ deleteDialogVisible: false });
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={{paddingTop: 40, padding: 20}}>
                    { this._renderTextInput('Título del Album: *', 'title', 'My Album') }
                </View>

                <View style={{ paddingHorizontal: 20, paddingBottom: 40}}>
                    { this._renderImageInput() }
                </View>

                <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                    <Button
                        label={'Guardar'.toUpperCase()}
                        onPress={() => this._onSubmit()}
                        isFetching={this.props.isFetching}
                    />
                </View>

                {this._renderDeleteImage()}

                <Dialog.Container visible={this.state.deleteDialogVisible}>
                    <Dialog.Title>Eliminar Álbum</Dialog.Title>
                    <Dialog.Description>
                        ¿Deseas eliminar el Álbum? Esta acción no puede deshacerse
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
        album: state.albums.item,
        isFetching: state.albums.isFetching
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onNewAlbum: (data) => {
            dispatch(AlbumsActions.createAlbum(data))
        },
        onEditAlbum: (data) => {
            dispatch(AlbumsActions.updateAlbum(data))
        },
        onDeleteAlbum: () => {
            dispatch(AlbumsActions.deleteAlbum())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAlbum)