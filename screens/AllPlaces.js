import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import PlacesList from '../components/places/PlacesList'
import { fetchPlaces } from '../util/database';

export default function AllPlaces({route}) {
  const isFocusesd = useIsFocused();
  const [loadedPlaces,setLoadedPlaces] = useState([]);


  useEffect(()=>{

    async function helper(){
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    } 

    if(isFocusesd){
      helper();
      //setLoadedPlaces(currPlaces => [...currPlaces, route.params.place])
    }
  },[isFocusesd])
  
  return (
   <PlacesList places={loadedPlaces}></PlacesList>
  )
}
