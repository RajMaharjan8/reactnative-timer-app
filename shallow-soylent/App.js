import * as React from 'react';
import { Text, View, StyleSheet, AsyncStorage  } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-paper';
import { ActivityTime } from './src/features/ActivityTime';
import { useState } from 'react';
import { Timer } from './src/features/Timer';


import {ActivityHistory} from './src/features/ActivityHistory';


const STATUS = {
  COMPLETE: 1,
  CANCELED: 2
}



export default function App() {
  const [activitySubject, setActivitySubject] = useState();
  const [activityHistory, setActivityHistory] = useState([]);

  const addActivityHistorySubjectWithState = (subject, status) => {
    setActivityHistory([...activityHistory, {subject, status}]);
  };

  console.log(activityHistory);

const onClear=()=>{
  setActivityHistory([]);
}

 const saveActivityHistory = async () =>{
    try{
      await AsyncStorage.setItem('activityHistory',
      JSON.stringify(activityHistory))
    }catch(e){
      console.log(e)
    }
  }

React.useEffect(()=>{
  saveActivityHistory()
},[activityHistory])

const loadActivityHistory = async() =>{
  try{
    const history = await AsyncStorage.getItem('activityHistory');
    if(history && JSON.parse(history).length){
      setActivityHistory(JSON.parse(history))
    }
  }
  catch(e){
    console.log(e);
  }
}

React.useEffect(()=>{
  loadActivityHistory()
},[])

  return (
    <View style={styles.container}>
      <Text>
        {activitySubject ? (
          <Timer
            activitySubject={activitySubject}
            onTimerEnd={() => {
              addActivityHistorySubjectWithState(activitySubject,STATUS.COMPLETE);
              setActivitySubject(null);
            }}
            clearSubject={() =>  { addActivityHistorySubjectWithState(activitySubject,STATUS.CANCELED);setActivitySubject(null)}}
          />
        ) : (
          <>
                <ActivityTime addSubject={setActivitySubject} activityHistory={activityHistory} />
                 <ActivityHistory activityHistory={activityHistory} onClear={onClear} />
          </>
    
         
        )}

        
      </Text>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'green',
    padding: 50,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});
