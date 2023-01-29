import React, { useState } from 'react'
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import { launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker'
import { Colors } from '../../ExtraFiles/colors';
import OutlinedButton from '../ui/OutlinedButton';


export default function ImagePicker({onTaken}) {

    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
    const [uri, setUri] = useState();


    async function verifyPermission(){
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED){
          const permResponse =  await requestPermission();  
        
            return permResponse.granted;
        }

        if(cameraPermissionInfo.status === PermissionStatus.DENIED){
            Alert.alert('Insuff Perms','Please grant perms');
            return false;
        }


        return true;
    }


    async function takeImageHandler(){
        try{
        const hasPerms = await verifyPermission(); 

        if(!hasPerms){
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        });
        setUri(image.assets[0].uri);
        onTaken(image.assets[0].uri);
        }catch(error){
            console.log("canceld")
        }
    }

    let imagePreview = <Text>No Image Taken</Text>;

    if(uri){
       imagePreview =  <Image style={styles.image} source={{uri: uri}}></Image>
        
    }

  return (
    <View>
        <View style={styles.imagePreview}>
            {imagePreview}
            
        </View>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  )
}


const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
})
