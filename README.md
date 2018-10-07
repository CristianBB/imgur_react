# Imgur React Native

Aplicación iOS/Android para gestionar Albumes de fotos haciendo uso de la API de 
[imgur](https://imgur.com/)

Desarrollada como entrega práctica del módulo React Native del VI BootCamp Development Mobile - KeepCoding.

 iOS                       |  Android                 |                  
:-------------------------:|:-------------------------:
![main](./art/ios.gif) | ![detail 1](./art/android.gif)

## Características

- Gestión automática de la renovación de los token de acceso
- Crear / Editar / Eliminar Álbums
- Agregar / Eliminar fotos a un Álbum

## Instrucciones

1. Crear en la raíz del proyecto el fichero ".env" con los datos de acceso a la API de imgur. Existe un fichero de ejemplo con el formato admitido con el nombre [.env.example](.env.example). Los pasos para obtener CLIENT_ID, CLIENT_SECRET y REFRESH_TOKEN se encuentran en la [documentación de la API de imgur](https://apidocs.imgur.com/#registration-quickstart)

2. Instalar dependencias del proyecto: `npm install`

3. Iniciar el servidor nodeJS: `npm start`

4. Ejecutar en el entorno deseado:
- iOS: `react-native run-ios`
- android: `react-native run-android`

## Autor
[Cristian Blázquez Bustos](www.linkedin.com/in/cristian-blazquez)
