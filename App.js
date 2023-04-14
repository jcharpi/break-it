import { useEffect, useState } from 'react';
import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// REACT HOOKS & COMPONENTS
import { useTheme } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

// PAGE LAYOUTS
import CreateHabitLayout from './layouts/CreateHabitLayout';
import TrackHabitLayout from './layouts/TrackHabitLayout';

// CONTEXTS
import HabitContext from './contexts/HabitContext';
import WhatNowModalVisibleContext from './contexts/WhatNowModalVisibleContext';
import ResetContext from './contexts/ResetContext';
import OccurrenceContext from './contexts/OccurrenceContext';
import WeekLayoutContext from './contexts/WeekLayoutContext';
import CurrentWeekContext from './contexts/CurrentWeekContext';

const Stack = createNativeStackNavigator()

export default function App() {
  // CONTEXTS
  const [initialRouteName, setInitialRouteName] = useState(null)
  const [occurrences, setOccurrences] = useState(0)
  const [reset, setReset] = useState(false)
  const [whatNowModalVisible, setWhatNowModalVisible] = useState(false)
  const [weeks, setWeeks] = useState({})
  const [currentWeek, setCurrentWeek] = useState()
  const [habit, setHabit] = useState({
    habitName: "",
    gem: "silver",
    goal: 0,
  })

  const theme = useTheme()
  theme.colors.secondaryContainer = "transparent"  

  // SET HABITS TO ASYNCSTORAGE VALUES ON PAGE LOAD
  const getHabit = async () => {
    try {
      const storedHabit = await AsyncStorage.getItem('habit')
      return storedHabit !== null ? (setHabit(JSON.parse(storedHabit)), true) : false
    } catch(error) {
      console.log(error)
    }
  }
  
  const getWeeks = async () => {
    try {
      const storedWeeks = await AsyncStorage.getItem('weeks')

      const parsedWeeks = JSON.parse(storedWeeks, (key, value) => {
        if (typeof value === 'string' && key.startsWith('week')) {
          return new Date(value)
        }
        return value
      })

      if (storedWeeks !== null) {
        setWeeks(parsedWeeks)
      }
    } catch(error) {
      console.log(error)
    }
  }

  const getCurrentWeek = async () => {
    try {
      const storedCurrentWeek = await AsyncStorage.getItem('currentWeek')
      if (storedCurrentWeek !== null) {
        setCurrentWeek(storedCurrentWeek)
      }
    } catch(error) {
      console.log(error)
    }
  }


  const getOccurrences = async () => {
    try {
      const storedOccurrences = await AsyncStorage.getItem('occurrences')
      if (storedOccurrences !== null) {
        setOccurrences(parseInt(storedOccurrences))
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
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
    getWeeks()
    getCurrentWeek()
  }, [])

  if (!initialRouteName) {
    return <Text style={{textAlign: 'center'}}>Loading...</Text> // TODO: Replace w/ loading component or icon
  }

  return (
    <CurrentWeekContext.Provider value={[currentWeek, setCurrentWeek]}>
      <WeekLayoutContext.Provider value={[weeks, setWeeks]}>
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
      </WeekLayoutContext.Provider>
    </CurrentWeekContext.Provider>
  )
}


