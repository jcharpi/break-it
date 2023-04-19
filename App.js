import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// REACT HOOKS & COMPONENTS
import { ActivityIndicator, useTheme } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"

// PAGE LAYOUTS
import CreateHabitLayout from "./layouts/CreateHabitLayout"
import TrackHabitLayout from "./layouts/TrackHabitLayout"

// CONTEXTS
import HabitContext from "./contexts/HabitContext"
import WhatNowModalVisibleContext from "./contexts/WhatNowModalVisibleContext"
import ResetContext from "./contexts/ResetContext"
import OccurrenceContext from "./contexts/OccurrenceContext"
import WeekLayoutContext from "./contexts/WeekLayoutContext"
import CurrentWeekContext from "./contexts/CurrentWeekContext"
import GoalDecrementContext from "./contexts/GoalDecrementContext"
import AchievementContext from "./contexts/AchievementContext"
import FirstLoadContext from "./contexts/FirstLoadContext"

const Stack = createNativeStackNavigator()

export default function App() {
  // CONTEXTS
  const [achievements, setAchievements] = useState([])
  const [currentWeek, setCurrentWeek] = useState()
  const [firstLoad, setFirstLoad] = useState(true)
  const [goalDecrement, setGoalDecrement] = useState(1)
  const [habit, setHabit] = useState({
    gem: "silver",
    goal: 0,
    habitName: ""
  })
  const [initialRouteName, setInitialRouteName] = useState(null)
  const [occurrences, setOccurrences] = useState(0)
  const [reset, setReset] = useState(false)
  const [weeks, setWeeks] = useState({})
  const [whatNowModalVisible, setWhatNowModalVisible] = useState(false)

  const theme = useTheme()
  theme.colors.secondaryContainer = "transparent"  

  // SET HABITS TO ASYNCSTORAGE VALUES ON PAGE LOAD
  const getAchievements = async () => {
    try {
      const storedAchievements = await AsyncStorage.getItem("achievements")
      if (storedAchievements !== null) {
        setAchievements(JSON.parse(storedAchievements))
      }
    } catch(error) {
      console.log(error)
    }
  }

  const getFirstLoad = async () => {
    try {
      const storedFirstLoad = await AsyncStorage.getItem("firstLoad")
      if (storedFirstLoad !== null) {
        setFirstLoad(JSON.parse(storedFirstLoad))
      }
    } catch(error) {
      console.log(error)
    }
  }

  const getGoalDecrement = async () => {
    try {
      const storedGoalDecrement = await AsyncStorage.getItem("goalDecrement")
      if (storedGoalDecrement !== null) {
        setGoalDecrement(parseInt(storedGoalDecrement))
      }
    } catch(error) {
      console.log(error)
    }
  }

  const getCurrentWeek = async () => {
    try {
      const storedCurrentWeek = await AsyncStorage.getItem("currentWeek")
      if (storedCurrentWeek !== null) {
        setCurrentWeek(storedCurrentWeek)
      }
    } catch(error) {
      console.log(error)
    }
  }

  const getHabit = async () => {
    try {
      const storedHabit = await AsyncStorage.getItem("habit")
      return storedHabit !== null ? (setHabit(JSON.parse(storedHabit)), true) : false
    } catch(error) {
      console.log(error)
    }
  }

  const getOccurrences = async () => {
    try {
      const storedOccurrences = await AsyncStorage.getItem("occurrences")
      if (storedOccurrences !== null) {
        setOccurrences(parseInt(storedOccurrences))
      }
    } catch(error) {
      console.log(error)
    }
  }

  const getWeeks = async () => {
    try {
      const storedWeeks = await AsyncStorage.getItem("weeks")

      const parsedWeeks = JSON.parse(storedWeeks, (key, value) => {
        if (typeof value === "string" && key.startsWith("week")) {
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

    getAchievements()
    getCurrentWeek()
    getFirstLoad()
    getGoalDecrement()
    getInitialRouteName()
    getOccurrences()
    getWeeks()
  }, [])

  if (!initialRouteName) {
    return <ActivityIndicator animating={true} color={"white"}/>
  }

  return (
    <AchievementContext.Provider value={[achievements, setAchievements]}>
      <CurrentWeekContext.Provider value={[currentWeek, setCurrentWeek]}>
        <FirstLoadContext.Provider value={[firstLoad, setFirstLoad]}>
          <GoalDecrementContext.Provider value={[goalDecrement, setGoalDecrement]}>
            <HabitContext.Provider value={[habit, setHabit]}>
              <OccurrenceContext.Provider value={[occurrences, setOccurrences]}>
                <ResetContext.Provider value={[reset, setReset]}>
                  <WeekLayoutContext.Provider value={[weeks, setWeeks]}>
                    <WhatNowModalVisibleContext.Provider value={[whatNowModalVisible, setWhatNowModalVisible]}>
                      <NavigationContainer>
                          <Stack.Navigator 
                            initialRouteName={initialRouteName}
                            screenOptions={{
                              headerShown: false,
                            }}
                          >
                            <Stack.Screen 
                              name="CreateHabitLayout" 
                              component={CreateHabitLayout} 
                              options={{
                                animation: "fade",
                                animationDuration: 500,
                                gestureEnabled: false,
                              }}
                            />
                            <Stack.Screen 
                              name="TrackHabitLayout" 
                              component={TrackHabitLayout} 
                              options={{
                                animation: "fade",
                                animationDuration: 500,
                                gestureEnabled: false,
                              }}
                            />
                          </Stack.Navigator>
                        </NavigationContainer>
                    </WhatNowModalVisibleContext.Provider>
                  </WeekLayoutContext.Provider>
                </ResetContext.Provider>
              </OccurrenceContext.Provider>
            </HabitContext.Provider>
          </GoalDecrementContext.Provider>
        </FirstLoadContext.Provider>
      </CurrentWeekContext.Provider>
    </AchievementContext.Provider>
  )
}


