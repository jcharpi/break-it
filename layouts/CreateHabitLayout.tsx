// REACT HOOKS & COMPONENTS
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Icon from "react-native-vector-icons/Ionicons"

// PAGES
import EnterHabitPage from "../pages/EnterHabitPage"
import QuestionPage from "../pages/QuestionPage"
import HelpPage from "../pages/HelpPage"

// REDUX
import { useAppSelector } from "../app/hooks"
import { selectActiveSlider } from "../reducers/activeSliderSlice"
import { selectFirstLoad } from "../reducers/firstLoadSlice"

// STYLE
import styles from "../styles"

const Tab = createMaterialTopTabNavigator()

export default function CreateHabitLayout() {
	const activeSlider = useAppSelector(selectActiveSlider)
	const firstLoad = useAppSelector(selectFirstLoad)

	return (
		<Tab.Navigator
			initialRouteName="HelpPage"
			tabBar={firstLoad ? undefined : () => null}
			backBehavior="firstRoute"
			tabBarPosition="bottom"
			screenOptions={
				firstLoad
					? {
							tabBarIcon: ({ focused, color }) => {
								const iconName = focused ? "ellipse" : "ellipse-outline"
								color = focused ? "#DDE2F5" : "white"
								return <Icon name={iconName} size={25} color={color} />
							},
							tabBarShowLabel: false,
							tabBarStyle: styles.createTabBar,
							tabBarContentContainerStyle: styles.createTabBarContainer,
							tabBarItemStyle: styles.createTabBarItem,
							tabBarIndicatorStyle: { opacity: 0 },
							tabBarGap: 2,
							tabBarAndroidRipple: { color: "transparent" },
					  }
					: {
							tabBarAndroidRipple: { color: "transparent" },
					  }
			}
		>
			{firstLoad && (
				<Tab.Screen
					name="HelpPage"
					component={HelpPage}
					options={{ swipeEnabled: true }}
				/>
			)}
			<Tab.Screen
				name="EnterHabitPage"
				component={EnterHabitPage}
				options={{ swipeEnabled: true }}
			/>
			<Tab.Screen
				name="QuestionPage"
				component={QuestionPage}
				options={{ swipeEnabled: activeSlider ? false : true }}
			/>
		</Tab.Navigator>
	)
}
