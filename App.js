import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/IconButton';
import { Colors} from './ExtraFiles/colors';
import Maps from './screens/Maps';
import { useEffect, useState } from 'react';
import { init } from './util/database';

import * as SplashScreen from 'expo-splash-screen';
import PlaceDetails from './screens/PlaceDetails';


const stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [dbInit, setdbInit] = useState(false);

  useEffect(()=>{
    init().then(()=>{
      setdbInit(true)
    })
  },[])

  if(dbInit){
    SplashScreen.hideAsync();
  }

  if(!dbInit){
    return null;
  }


  return (
   <>
    <StatusBar style='dark'></StatusBar>
    <NavigationContainer>
      <stack.Navigator screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: Colors.gray700,
        contentStyle: {
          backgroundColor: Colors.gray700
        }
      }}>
        <stack.Screen name="AllPlaces" component={AllPlaces} 
        
        options={({navigation})=>({
          title: 'Your favourite places',
          headerRight: ({tintColor})=> (
            <IconButton name="add" size={24} color={tintColor} onPress={()=>navigation.navigate('AddPlace')}></IconButton>
          )
        })}/>
        <stack.Screen name="AddPlace" component={AddPlace} options={
          {
            title: 'Add a new place'
          }
        }/>
        <stack.Screen name="Map" component={Maps}/>
        <stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
          title: "Loading Place...."
        }}/>
      </stack.Navigator>
    </NavigationContainer>
   </>
  );
}


