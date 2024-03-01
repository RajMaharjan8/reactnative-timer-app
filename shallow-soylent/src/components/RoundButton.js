import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export const RoundButton = ({
  style ={},
  textStyle ={},
  size = 125,
  ...props
}) =>{
  return(
      <TouchableOpacity style={[styles(size).radius, style]}>
        <Text style={styles(size).text, textStyle} 
        onPress={props.onPress}
        > {props.title} </Text>
      </TouchableOpacity>
  )
}

const styles = (size)=>StyleSheet.create(
  {
    radius:{
      borderRadius: size/2,
      borderColor: '#fff',
      borderWidth: 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text:{
      color: 'white',
      fontSize: size/3
    }
  }
)