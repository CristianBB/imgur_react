import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { Button, TextInput } from '../../widgets/'
import styles from './styles'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import * as ImagesActions from '../../../redux/images/actions'

class NewImage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            image: null,
        };

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
        const {title, description, image} = this.state;
        return (title && description && image);
    }

    _onSubmit() {
        if(this._validateForm()) {
            const {title, description, image} = this.state ;

            const data = {
                title: title,
                description: description,
                image: image.data,
            };
            this.props.onNewImage(data);

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
                <TouchableOpacity style={styles.imagePicker} onPress={() => this._onImagePickerTapped()}>
                    <Image source={imageUri} style={styles.image} resizeMode={'cover'} />
                    <Text style={styles.imageText}>{imageLabel}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    { this._renderTextInput('Título de la Imagen *', 'title', 'Titulo de la Imagen') }
                </View>

                <View style={styles.imageContainer}>
                    { this._renderImageInput() }
                </View>

                <View style={styles.descriptionContainer}>
                    { this._renderTextInput('Descripción de la Imagen *', 'description', 'Descripción') }
                </View>

                <View style={styles.buttonContainer}>
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
        isFetching: state.images.isFetching
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onNewImage: (data) => {
            dispatch(ImagesActions.createImage(data))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewImage)