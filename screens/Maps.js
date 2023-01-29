import React, { useCallback, useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import IconButton from '../components/ui/IconButton';

export default function Maps({navigation, route}) {

  const initialLocation = route.params ? {lat: route.params.lat, lng: route.params.lng}: null;


  const [selecetedLocation, setLocation] = useState(initialLocation);


  const region = {
    latitude: route.params ? initialLocation.lat : 37.78,
    longitude: route.params ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421 
  };

  function selectLocationHandler(event){

    if(initialLocation){
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setLocation({lat: lat, lng: lng});

  }

  const savePicked = useCallback(()=>{
    if(!selecetedLocation){
        Alert.alert("none picked","please tap a place")
        return;
      }

      navigation.navigate('AddPlace',{ pickedLat: selecetedLocation.lat, pickedLng: selecetedLocation.lng})
    
  }, [navigation, selecetedLocation]);

  
  useLayoutEffect(()=>{
    if(initialLocation){
      return;
    }
    navigation.setOptions({
      headerRight: ({tintColor})=>(<IconButton name={"save"} size={24} color={tintColor} onPress={savePicked}></IconButton>)
    })
  },[navigation, savePicked, initialLocation])
  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
      { selecetedLocation && (<Marker title="picked location" coordinate={{latitude: selecetedLocation.lat, longitude: selecetedLocation.lng}}></Marker>)}
    </MapView>
  )
}


const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})
