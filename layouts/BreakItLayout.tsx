// REACT HOOKS & COMPONENTS
import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ActivityIndicator } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"

// PAGE LAYOUTS
import CreateHabitLayout from "../layouts/CreateHabitLayout"
import TrackHabitLayout from "../layouts/TrackHabitLayout"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectHabit } from "../reducers/habitSlice"
import { setWeeks } from "../reducers/weekSlice"

// CONTEXTS
import WeekLayoutContext from "../contexts/WeekLayoutContext"
import CurrentWeekContext from "../contexts/CurrentWeekContext"

const Stack = createNativeStackNavigator()

export default function BreakItLayout() {
    const dispatch = useAppDispatch()
    const habit = useAppSelector(selectHabit)

    // CONTEXTS
    const [currentWeek, setCurrentWeek] = useState("")
    const [initialRouteName, setInitialRouteName] = useState("")

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

    // const getWeeks = async () => {
    //     try {
    //     const storedWeeks = await AsyncStorage.getItem("weeks")

    //     if (storedWeeks !== null) {
    //         const parsedWeeks = JSON.parse(storedWeeks, (key, value) => {
    //         if (typeof value === "string" && key.startsWith("week")) {
    //             return new Date(value)
    //         }
    //         return value
    //         })

    //         dispatch(setWeeks(parsedWeeks))
    //     }
    //     } catch(error) {
    //     console.log(error)
    //     }
    // }

    const getAsyncData = () => {
        getCurrentWeek()
    }

    useEffect(() => {
        const getInitialRouteName = async () => {
        const habitExists = habit.habitName === "" ? false : true
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
      </CurrentWeekContext.Provider>
    )
}


