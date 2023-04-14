// REACT HOOKS & COMPONENTS
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from 'react-native-vector-icons/Ionicons'

// PAGES
import EnterHabitPage from "../pages/EnterHabitPage";
import QuestionPage from "../pages/QuestionPage";
import WhatNowPage from "../pages/WhatNowPage";

const Tab = createMaterialTopTabNavigator()

export default function CreateHabitLayout() {
    return (
        <Tab.Navigator 
            initialRouteName='Enter Habit' 
            backBehavior='history' 
            tabBarPosition='bottom'
            screenOptions={{
                tabBarIcon: ({ focused, color }) => {
                    let iconName        
                    iconName = focused ? 'ellipse' : 'ellipse-outline'
                    color = focused ? '#DDE2F5' : 'white'
                    return <Icon name={iconName} size={25} color={color} />
                },
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarContentContainerStyle: styles.tabBarContainer,
                tabBarItemStyle: styles.tabBarItem,
                tabBarIndicatorStyle: { opacity: 0 },
                swipeEnabled: false,
                tabBarGap: 2,
            }}
        >
            <Tab.Screen name='EnterHabitPage' component={EnterHabitPage} />
            <Tab.Screen name='QuestionPage'component={QuestionPage} />
            <Tab.Screen name='WhatNowPage' component={WhatNowPage} />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: '#586183',
      paddingBottom: '15%',
    },
    tabBarContainer: {
        justifyContent: 'center'
    },
    tabBarItem: {
        width: 50, 
    },
  });