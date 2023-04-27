// REACT HOOKS & COMPONENTS
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

// PAGES
import ProgressPage from "../pages/ProgressPage"
import TrovePage from "../pages/TrovePage"

const Tab = createMaterialTopTabNavigator()

export default function TrackHabitLayout() {
	return (
		<Tab.Navigator
			backBehavior="initialRoute"
			initialRouteName="ProgressPage"
			tabBar={() => null}
			screenOptions={{
				lazy: true,
				lazyPreloadDistance: 2,
			}}
		>
			<Tab.Screen name="ProgressPage" component={ProgressPage} />
			<Tab.Screen name="TrovePage" component={TrovePage} />
		</Tab.Navigator>
	)
}
