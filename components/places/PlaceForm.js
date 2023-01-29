import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../ExtraFiles/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import { Place } from '../../models/place';

export default function PlaceForm({onCreatePlace}) {
  
  
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState();
  const [pickedImage, setPicekdImage] = useState();

  function changeTitleHandler(enteredText){
    setEnteredTitle(enteredText);
  }

  function savePlaceHandler(){
    const palceData = new Place(enteredTitle, pickedImage, pickedLocation);
    onCreatePlace(palceData);
  };

  function getImageData(imageUri){
    setPicekdImage(imageUri);
  }

  const  getLocationData =useCallback((location)=>{
    setPickedLocation(location);
  },[])
  
  return (
   <ScrollView style={styles.form}>
    <View >
      <Text style={styles.label}>
        Title
      </Text>
      <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}></TextInput>
    </View>
    <ImagePicker onTaken={getImageData} ></ImagePicker>
    <LocationPicker onLocation={getLocationData} ></LocationPicker>
    <Button onPress={savePlaceHandler}>Add Place</Button>
   </ScrollView>
  )
}


const styles = StyleSheet.create({
  form:{
    flex: 1,
    padding: 24
  },
  label:{
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input:{
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100

  }
})
