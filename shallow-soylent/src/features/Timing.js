import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RoundButton} from '../components/RoundButton';

export const Timing = ({onChangeTime}) =>{
  return(
    <>
    <View>
     <RoundButton title='10'  style={styles.title} size={75} onPress={()=>onChangeTime(10)} />
    </View>

    <View>
     <RoundButton title='15'  style={styles.title} size={75} onPress={()=>onChangeTime(15)}/>
    </View>

    <View>
     <RoundButton title='20'  style={styles.title} size={75} onPress={()=>onChangeTime(20)}/>
    </View>
    </>
  )
}

export const styles = StyleSheet.create({
   
    title:{
      color: 'white',
      textAlign: 'center',

    },
   
})