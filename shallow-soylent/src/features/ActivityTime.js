import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-paper';
import { RoundButton } from '../components/RoundButton';
import {fontSizes, spacing} from '../utils/sizes'; 
import {colors} from '../utils/colors';

export const ActivityTime = ({ addSubject }) => {
  const [tmpItem, setTmpItem] = useState();

  function inputHandler(enterData){
    setTmpItem(enterData);
  }


  return (
    <View style={styles.container}>

      <Text style={styles.title}>What activity would you like to perform?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          // onSubmitEditing={({ nativeEvent }) => {
          //   setTmpItem(nativeEvent.text);}}
          style={{ flex: 1, marginRight: 10 }}
          onChangeText={inputHandler}
        />
        <RoundButton style={styles.title} size={40} title="+" onPress={()=>{addSubject(tmpItem);}} />
      </View>


    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'ios' ? 'red' : colors.darkGreen,
    padding: spacing.sm,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
  inputContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
});
