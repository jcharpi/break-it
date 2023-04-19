// REACT HOOKS & COMPONENTS
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Icon from "react-native-vector-icons/Ionicons"

// PAGES
import EnterHabitPage from "../pages/EnterHabitPage"
import QuestionPage from "../pages/QuestionPage"
import WhatNowPage from "../pages/WhatNowPage"

// STYLE
import styles from "../styles"

const Tab = createMaterialTopTabNavigator()

export default function CreateHabitLayout() {
    return (
        <Tab.Navigator 
            initialRouteName="Enter Habit" 
            backBehavior="history" 
            tabBarPosition="bottom"
            screenOptions={{
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
                swipeEnabled: false,
                tabBarGap: 2,
                tabBarAndroidRipple: {color: "transparent"} 
            }}
        >
            <Tab.Screen name="EnterHabitPage" component={EnterHabitPage} />
            <Tab.Screen name="QuestionPage"component={QuestionPage} />
            <Tab.Screen name="WhatNowPage" component={WhatNowPage} />
        </Tab.Navigator>
    )
}