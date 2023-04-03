import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import EnterHabitPage from './pages/EnterHabitPage';
import QuestionPage from './pages/QuestionPage';
import WhatNowPage from './pages/WhatNowPage';
import Icon from 'react-native-vector-icons/Ionicons'

export default function App() {
  const Tab = createMaterialBottomTabNavigator();
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"

  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName='Enter Habit' 
        backBehavior='history' 
        labeled={false}
        barStyle={styles.tabBar}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;          
            iconName = focused ? 'ellipse' : 'ellipse-outline';
            color = focused ? '#DDE2F5' : 'white'
            // You can return any component that you like here!
            return <Icon name={iconName} size={27} color={color} />;
          },
        })}
      >
        <Tab.Screen name='Enter Habit' component={EnterHabitPage} />
        <Tab.Screen name='Questions'component={QuestionPage} />
        <Tab.Screen name='Overview' component={WhatNowPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#586183',
  },
  outline: {
    borderColor: 'black'
  }
});

