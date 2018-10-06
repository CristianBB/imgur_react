import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { Button, TextInput } from '../../widgets/'
import styles from './styles'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import * as AlbumsActions from '../../../redux/albums/actions'

class EditAlbum extends Component {

    constructor(props) {
        super(props);

        if(props.isEdit && props.album) {
            this.state = {
                title: props.album.title,
                image: { preview: {uri: props.album.cover_link }},
            }
        } else {
            this.state = {
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
        const imageUri = this.state.image ? this.state.image.preview : null;
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

    render() {
        return (
            <View style={styles.container}>
                <Text> Prueba </Text>

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
            // dispatch(AlbumsActions.postHouseCharacter(data))
        },
        onEditAlbum: (data) => {
            dispatch(AlbumsActions.updateAlbum(data))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAlbum)