// REACT HOOKS & COMPONENTS
import { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// COMPONENTS
import LoadingPage from "../components/LoadingPage"

// PAGE LAYOUTS
import CreateHabitLayout from "../layouts/CreateHabitLayout"
import TrackHabitLayout from "../layouts/TrackHabitLayout"

// REDUX
import { useAppSelector } from "../app/hooks"
import { selectHabit } from "../reducers/habitSlice"

const Stack = createNativeStackNavigator()

export default function BreakItLayout() {
	// REDUX
	const habit = useAppSelector(selectHabit).habit

	const [initialRouteName, setInitialRouteName] = useState("")

	useEffect(() => {
		function getInitialRouteName() {
			const habitExists =
				habit.habitName === "" || habit.goal === 0 ? false : true

			habitExists
				? setInitialRouteName("TrackHabitLayout")
				: setInitialRouteName("CreateHabitLayout")
		}

		getInitialRouteName()
	}, [habit])

	if (!initialRouteName) {
		return <LoadingPage />
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