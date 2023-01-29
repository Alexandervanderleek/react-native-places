import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { Colors } from '../../ExtraFiles/colors'

export default function Button({onPress, children}) {
  return (
   <Pressable style={(pressed)=>[pressed && styles.pressed, styles.button]} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
   </Pressable>
  )
}


const styles = StyleSheet.create({
    button:{
       paddingHorizontal: 12,
       paddingVertical: 8,
       margin: 4,
       backgroundColor: Colors.primary800,
       elevation: 2,
       shadowOpacity: 0.15,
       shadowOffset: {width: 1,height: 1},
       shadowRadius: 2,
       borderRadius: 4,

    },
    pressed:{
        opacity: 0.75,
    },
    text:{
        textAlign: 'center',
        fontSize: 16
    }
})
