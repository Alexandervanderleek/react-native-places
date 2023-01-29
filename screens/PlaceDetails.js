import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import OutlinedButton from '../components/ui/OutlinedButton'
import { Colors } from '../ExtraFiles/colors'
import { fetchPlaceDetails } from '../util/database'

export default function PlaceDetails({route, navigation}) {
  
  const selectedPlace = route.params.placeId
  const [fetchedPlace, setFetchedPlace]= useState();


  useEffect(()=>{
    async function helper(){
      const place = await fetchPlaceDetails(selectedPlace);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title
      })
    }

    helper()
  }, [selectedPlace])

  function showOnMap(){
    navigation.navigate("Map", {
      lat: fetchedPlace.location.lat,
      lng: fetchedPlace.location.lng
    });
  }
  

  if(!fetchedPlace){
    return(
      <View style={styles.fallback}>
        <Text>Fetching Place</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: fetchedPlace.imageUri}}></Image>
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon={"map"} onPress={showOnMap}>View on Map</OutlinedButton>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  fallback:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  location: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer:{
    padding: 20,
    
  },
  address:{
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})