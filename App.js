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

const Stack = createNativeStackNavigator();

export default function App() {
  const [reset, setReset] = useState(false)
  const [whatNowModalVisible, setWhatNowModalVisible] = useState(false)
  const [habit, setHabit] = useState({
    habitName: "",
    gem: "silver",
    goal: 0,
  })
  const [initialRouteName, setInitialRouteName] = useState(null)

  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent"  


  const getHabit = async () => {
    try {
      const storedHabit = await AsyncStorage.getItem('habit')
      console.log(storedHabit)
      return storedHabit !== null ? (setHabit(JSON.parse(storedHabit)), true) : false
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const habitExists = await getHabit();
      if (habitExists) {
        setInitialRouteName(() => "TrackHabitLayout")
      } else {
        setInitialRouteName(() => "CreateHabitLayout")
      }
    };
    fetchData();
  }, [])

  if (!initialRouteName) {
    return <Text>froggin</Text>; // TODO: Replace w/ loading component or icon
  }

  return (
    <HabitContext.Provider value={[habit, setHabit]}>
      <ResetContext.Provider value={[reset, setReset]}>
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
      </ResetContext.Provider>
    </HabitContext.Provider>
  );
}


