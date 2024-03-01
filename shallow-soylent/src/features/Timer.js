import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Vibration, Platform} from 'react-native';
import {colors} from '../utils/colors'
import {CountDown} from '../components/CountDown';
import {RoundButton} from '../components/RoundButton';
import {ProgressBar} from 'react-native';
import {fontSizes, spacing} from '../utils/sizes';
import {Timing} from './Timing';

import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;

export const Timer = ({activitySubject, onTimerEnd, clearSubject}) =>{
  useKeepAwake();

  const interval = useRef();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress=(progress)=>{
    setProgress(progress)
  }

  const changeTime=(min)=>{
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);

    
  }

  const onEnd =()=>{
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const vibrate = ()=>{
    if(Platform.OS === 'ios'){
      const interval = setInterval(()=>Vibration.vibrate(), 1000);
      setTimeout(()=>clearInterval(interval),10000)
    }
    else{
      Vibration.vibrate(10000)
    }

  }

  return(
    <View>
    <View style={styles.container}>
    <CountDown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd}/>
     </View>
    <View style={{paddingTop: spacing.xxl}}>
      <Text style={styles.title}>Activity Performing</Text>
      <Text style={styles.task}>{activitySubject}</Text>
    </View>
    
   

<View style={{paddingTop: spacing.sm}}>
  <ProgressBar progress={progress} color='#cc8f0c' style={{height: 20}}/>
</View>
  
  <View style={styles.buttonWrapper}>
  <Timing onChangeTime={changeTime}/>
  </View>

<View style={styles.buttonWrapper}>
 {isStarted ?(
      <RoundButton style={styles.title} title='Pause' onPress={()=>setIsStarted(false)} />
    ):(
    <RoundButton style={styles.title} title='Start' onPress={()=>setIsStarted(true)} />
    )}

  
</View>
  <View style={styles.clearSubject}>
    <RoundButton style={styles.title} size={60} title='-' onPress={()=>clearSubject()}  />
    </View>

    </View>
  )
}

export const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    buttonWrapper:{
        flex: 0.4,
        padding: 15,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row'
    },
    title:{
      color: colors.white,
      textAlign: 'center',

    },
    task:{
      color: colors.white,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    clearSubject:{
      paddingBottom: 25,
      paddingLeft: 25
    }
  
})