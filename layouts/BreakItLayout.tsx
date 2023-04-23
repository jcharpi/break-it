// REACT HOOKS & COMPONENTS
import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ActivityIndicator, useTheme } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"

// PAGE LAYOUTS
import CreateHabitLayout from "../layouts/CreateHabitLayout"
import TrackHabitLayout from "../layouts/TrackHabitLayout"

// CONTEXTS
import HabitContext from "../contexts/HabitContext"
import HelpModalVisibleContext from "../contexts/HelpModalVisibleContext"
import ResetContext from "../contexts/ResetContext"
import WeekLayoutContext from "../contexts/WeekLayoutContext"
import CurrentWeekContext from "../contexts/CurrentWeekContext"

// REDUX
import { useAppDispatch } from "../app/hooks";
import { setGoalDecrement } from "../reducers/goalDecrementSlice";
import { setOccurrences } from "../reducers/occurrenceSlice"

const Stack = createNativeStackNavigator()

export default function BreakItLayout() {
    const dispatch = useAppDispatch()

    // CONTEXTS
    const [currentWeek, setCurrentWeek] = useState("")
    const [habit, setHabit] = useState({
        gem: "silver",
        goal: 0,
        habitName: ""
    })
    const [initialRouteName, setInitialRouteName] = useState("")
    const [reset, setReset] = useState(false)
    const [weeks, setWeeks] = useState({})
    const [HelpModalVisible, setHelpModalVisible] = useState(false)

    const theme = useTheme()
    theme.colors.secondaryContainer = "transparent"  

  // SET HABITS TO ASYNCSTORAGE VALUES ON PAGE LOAD
  // const getAchievements = async () => {
  //   try {
  //     const storedAchievements = await AsyncStorage.getItem("achievements")
  //     if (storedAchievements !== null) {
  //       setAchievements(JSON.parse(storedAchievements))
  //     }
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

  // const getFirstLoad = async () => {
  //   try {
  //     const storedFirstLoad = await AsyncStorage.getItem("firstLoad")
  //     if (storedFirstLoad !== null) {
  //       setFirstLoad(JSON.parse(storedFirstLoad))
  //     }
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

    const getGoalDecrement = async () => {
        try {
        const storedGoalDecrement = await AsyncStorage.getItem("goalDecrement")
        if (storedGoalDecrement !== null) {
            dispatch(setGoalDecrement(parseInt(storedGoalDecrement)))
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
            dispatch(setOccurrences(parseInt(storedOccurrences)))
        }
        } catch(error) {
        console.log(error)
        }
    }

    const getWeeks = async () => {
        try {
        const storedWeeks = await AsyncStorage.getItem("weeks")

        if (storedWeeks !== null) {
            const parsedWeeks = JSON.parse(storedWeeks, (key, value) => {
            if (typeof value === "string" && key.startsWith("week")) {
                return new Date(value)
            }
            return value
            })

            setWeeks(parsedWeeks)
        }
        } catch(error) {
        console.log(error)
        }
    }

    const getAsyncData = () => {
        //getAchievements()
        getCurrentWeek()
        //getFirstLoad()
        getGoalDecrement()
        getOccurrences()
        getWeeks()
    }

    useEffect(() => {
        const getInitialRouteName = async () => {
        const habitExists = await getHabit()
        if (habitExists) {
            setInitialRouteName("TrackHabitLayout")
        } else {
            setInitialRouteName("CreateHabitLayout")
        }
        }

        getAsyncData()
        getInitialRouteName()
    }, [])

    if (!initialRouteName) {
    return <ActivityIndicator animating={true} color={"white"}/>
    }

    return (
      <CurrentWeekContext.Provider value={[currentWeek, setCurrentWeek]}>
        <HabitContext.Provider value={[habit, setHabit]}>
          <ResetContext.Provider value={[reset, setReset]}>
            <WeekLayoutContext.Provider value={[weeks, setWeeks]}>
              <HelpModalVisibleContext.Provider value={[HelpModalVisible, setHelpModalVisible]}>
                <NavigationContainer>
                    <Stack.Navigator 
                      initialRouteName={initialRouteName}
                      screenOptions={{
                        headerShown: false,
                        animation: "fade",
                        animationDuration: 500,
                        gestureEnabled: false,
                      }}
                    >
                      <Stack.Screen 
                        name="CreateHabitLayout" 
                        component={CreateHabitLayout} 
                      />
                      <Stack.Screen 
                        name="TrackHabitLayout" 
                        component={TrackHabitLayout}  
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
              </HelpModalVisibleContext.Provider>
            </WeekLayoutContext.Provider>
          </ResetContext.Provider>
        </HabitContext.Provider>
      </CurrentWeekContext.Provider>
    )
}


