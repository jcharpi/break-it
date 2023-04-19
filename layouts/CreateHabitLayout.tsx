// REACT HOOKS & COMPONENTS
import { useContext } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Icon from "react-native-vector-icons/Ionicons"

// PAGES
import EnterHabitPage from "../pages/EnterHabitPage"
import QuestionPage from "../pages/QuestionPage"
import WhatNowPage from "../pages/WhatNowPage"

// CONTEXTS
import FirstLoadContext from "../contexts/FirstLoadContext"

// STYLE
import styles from "../styles"

const Tab = createMaterialTopTabNavigator()

export default function CreateHabitLayout() {
    const [firstLoad, setFirstLoad] = useContext(FirstLoadContext)

    return (
        <Tab.Navigator 
            initialRouteName="WhatNowPage" 
            tabBar={firstLoad ? undefined : () => null}
            backBehavior="history" 
            tabBarPosition="bottom"
            screenOptions={
                firstLoad ?
                {
                    tabBarIcon: ({ focused, color }) => {
                        let iconName        
                        iconName = focused ? "ellipse" : "ellipse-outline"
                        color = focused ? "#DDE2F5" : "white"
                        return <Icon name={iconName} size={25} color={color} />
                    },
                    tabBarShowLabel: false,
                    tabBarStyle: styles.createTabBar,
                    tabBarContentContainerStyle: styles.createTabBarContainer,
                    tabBarItemStyle: styles.createTabBarItem,
                    tabBarIndicatorStyle: { opacity: 0 },
                    tabBarGap: 2,
                    tabBarAndroidRipple: {color: "transparent"},
                    swipeEnabled: false,
                } 
                : 
                {
                    tabBarAndroidRipple: {color: "transparent"},
                    swipeEnabled: false, 
                }
            }
        >
            <Tab.Screen name="WhatNowPage" component={WhatNowPage} />
            <Tab.Screen name="EnterHabitPage" component={EnterHabitPage} />
            <Tab.Screen name="QuestionPage"component={QuestionPage} />
        </Tab.Navigator>
    )
}