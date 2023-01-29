import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../ExtraFiles/colors'
import OutlinedButton from '../ui/OutlinedButton'
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location'
import { getAddress, getMapPreview } from '../../util/location'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'

export default function LocationPicker({onLocation}) {

    const navigation = useNavigation();

    const isFocused = useIsFocused();

    const route = useRoute();

    const [pickedLocation, setPickedLocation] = useState();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();



    useEffect(()=>{
        if(isFocused && route.params){
        const mapPickedLocation = {lat: route.params.pickedLat, lng: route.params.pickedLng}
        
        setPickedLocation(mapPickedLocation);
    }

    }, [route, isFocused]);


    useEffect(()=>{
        async function helper(){
            if(pickedLocation){
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
                onLocation({...pickedLocation, address: address});
            }
        }
        helper();
         
    },[pickedLocation, onLocation])


    async function verifyPerms(){
        
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permResponse =  await requestPermission();  
          
              return permResponse.granted;
          }
  
          if(locationPermissionInformation.status === PermissionStatus.DENIED){
              Alert.alert('Insuff Perms','Please grant perms');
              return false;
          }
  
          return true;
    }

    async function getLocationHandler(){
        const harPerms = await verifyPerms();
        if(!harPerms){
            return;
        }
        const position = await getCurrentPositionAsync();
        setPickedLocation({
            lat:position.coords.latitude,
            lng:position.coords.longitude,
        });
        
    }

    function pickOnMapHandler(){
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No Location Picked yet...</Text>

    if(pickedLocation){
        locationPreview = <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}></Image>

    }

  return (
    <View>
        <View style={styles.mapPreview}>
             {locationPreview} 
        </View>
        <View style={styles.actions}>
            <OutlinedButton onPress={getLocationHandler} icon="location">Locate User</OutlinedButton>
            <OutlinedButton onPress={pickOnMapHandler} icon="map">Pick on Map</OutlinedButton>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    mapPreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
})
