import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {RoundButton} from '../components/RoundButton'
const HistoryItem =({item})=>{
  return(
    <Text style={styles.historyItem(item.status)}>{item.subject}</Text>
  )
}

export const ActivityHistory = ({activityHistory, onClear})=>{
  return(
    <>
    <SafeAreaView style={{flex: 0.5, alignItems:'center'}}>
    <Text style={styles.title}>Your History</Text>
    {!!activityHistory.length &&
      <FlatList 
      data={activityHistory}
      renderItem={HistoryItem}
      contentContainerStyle={{flex:1, alignItems:'center'}}
      />
     }
    </SafeAreaView>

        <View style={[styles.clearContainer, styles.title]}> 
        <RoundButton size={70} title='Clear' onPress={()=> onClear()} />
        </View>
        </>
  )
}

const styles = StyleSheet.create({
  historyItem:(status)=>({
    fontSize: 16,
    color: status >1?'red': 'yellow'
  }),
  title:{
    color:'white',
    fontSize: 16
  },
  clearContainer:{
    alignItems:'center',
  }
})