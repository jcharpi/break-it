import { useEffect, useState } from 'react';
import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

import CreateHabitLayout from './layouts/CreateHabitLayout';
import TrackHabitLayout from './layouts/TrackHabitLayout';

import HabitContext from './contexts/HabitContext';
import WhatNowModalVisibleContext from './contexts/WhatNowModalVisibleContext';
import ResetContext from './contexts/ResetContext';
import OccurrenceContext from './contexts/OccurrenceContext';
import StartHabitDateContext from './contexts/StartHabitDateContext';

const Stack = createNativeStackNavigator()

export default function App() {
  const [startHabitDate, setStartHabitDate] = useState(new Date())
  const [initialRouteName, setInitialRouteName] = useState(null)
  const [occurrences, setOccurrences] = useState(0)
  const [reset, setReset] = useState(false)
  const [whatNowModalVisible, setWhatNowModalVisible] = useState(false)
  const [habit, setHabit] = useState({
    habitName: "",
    gem: "silver",
    goal: 0,
  })

  const theme = useTheme()
  theme.colors.secondaryContainer = "transparent"  

  const getHabit = async () => {
    try {
      const storedHabit = await AsyncStorage.getItem('habit')
      console.log(storedHabit)
      console.log(startHabitDate)
      return storedHabit !== null ? (setHabit(JSON.parse(storedHabit)), true) : false
    } catch(error) {
      console.log(error)
    }
  }

  const getOccurrences = async () => {
    try {
      const storedOccurrences = await AsyncStorage.getItem('occurrences')
      if (storedOccurrences !== null) {
        setOccurrences(() => parseInt(storedOccurrences), true)
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    AsyncStorage.clear()
    const getInitialRouteName = async () => {
      const habitExists = await getHabit()
      if (habitExists) {
        setInitialRouteName(() => "TrackHabitLayout")
      } else {
        setInitialRouteName(() => "CreateHabitLayout")
      }
    }
    getInitialRouteName()
    getOccurrences()
  }, [])

  if (!initialRouteName) {
    return <Text style={{textAlign: 'center'}}>Loading...</Text> // TODO: Replace w/ loading component or icon
  }

  return (
    <StartHabitDateContext.Provider value={[startHabitDate, setStartHabitDate]}>
      <HabitContext.Provider value={[habit, setHabit]}>
        <ResetContext.Provider value={[reset, setReset]}>
          <OccurrenceContext.Provider value={[occurrences, setOccurrences]}>
            <WhatNowModalVisibleContext.Provider value={[whatNowModalVisible, setWhatNowModalVisible]}>
              <NavigationContainer>
                <Stack.Navigator 
                  initialRouteName={initialRouteName}
                  screenOptions={{
                    headerShown: false
                  }}
                >
                  <Stack.Screen name="CreateHabitLayout" component={CreateHabitLayout} options={{gestureEnabled: false}}/>
                  <Stack.Screen name="TrackHabitLayout" component={TrackHabitLayout} options={{gestureEnabled: false}}/>
                </Stack.Navigator>
              </NavigationContainer>
            </WhatNowModalVisibleContext.Provider>
          </OccurrenceContext.Provider>
        </ResetContext.Provider>
      </HabitContext.Provider>
    </StartHabitDateContext.Provider>
  )
}


