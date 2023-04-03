import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet } from "react-native";
import EnterHabitPage from "../pages/EnterHabitPage";
import QuestionPage from "../pages/QuestionPage";
import WhatNowPage from "../pages/WhatNowPage";
import Icon from 'react-native-vector-icons/Ionicons'

export default function CreateHabitLayout() {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator 
            initialRouteName='Enter Habit' 
            backBehavior='history' 
            labeled={false}
            barStyle={styles.tabBar}
            screenOptions={() => ({
            tabBarIcon: ({ focused, color }) => {
                let iconName;          
                iconName = focused ? 'ellipse' : 'ellipse-outline';
                color = focused ? '#DDE2F5' : 'white'
                // You can return any component that you like here!
                return <Icon name={iconName} size={27} color={color} />;
            },
            })}
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
    },
  });