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
import ResetContext from "../contexts/ResetContext"
import WeekLayoutContext from "../contexts/WeekLayoutContext"
import CurrentWeekContext from "../contexts/CurrentWeekContext"

const Stack = createNativeStackNavigator()

export default function BreakItLayout() {
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

    const theme = useTheme()
    theme.colors.secondaryContainer = "transparent"  

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
        getCurrentWeek()
        getWeeks()
    }

    useEffect(() => {
      AsyncStorage.clear()
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
            </WeekLayoutContext.Provider>
          </ResetContext.Provider>
        </HabitContext.Provider>
      </CurrentWeekContext.Provider>
    )
}


