// REACT HOOKS & COMPONENTS
import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ActivityIndicator } from "react-native-paper"

// PAGE LAYOUTS
import CreateHabitLayout from "../layouts/CreateHabitLayout"
import TrackHabitLayout from "../layouts/TrackHabitLayout"

// REDUX
import { useAppSelector } from "../app/hooks"
import { selectHabit } from "../reducers/habitSlice"

const Stack = createNativeStackNavigator()

export default function BreakItLayout() {
  // REDUX
	const habit = useAppSelector(selectHabit)

	const [initialRouteName, setInitialRouteName] = useState("")
  console.log(habit)

	useEffect(() => {
		const getInitialRouteName = async () => {
			const habitExists = habit.habitName === "" ? false : true

			if (habitExists) {
				setInitialRouteName("TrackHabitLayout")
			} else {
				setInitialRouteName("CreateHabitLayout")
			}
		}

		getInitialRouteName()
	}, [])

	if (!initialRouteName) {
		return <ActivityIndicator animating={true} color={"white"} />
	}

	return (
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
				<Stack.Screen name="CreateHabitLayout" component={CreateHabitLayout} />
				<Stack.Screen name="TrackHabitLayout" component={TrackHabitLayout} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
