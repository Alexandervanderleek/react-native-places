import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Ionicons} from '@expo/vector-icons'

export default function IconButton({name, size, color, onPress}) {
  return (
   <Pressable onPress={onPress} style={({pressed})=>[styles.button, pressed && styles.pressed]}>
        <Ionicons name={name} size={size} color={color}></Ionicons>
   </Pressable>
        
  )
}


const styles = StyleSheet.create({
    button:{
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.75
    }
})
