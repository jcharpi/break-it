import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Summary from './components/Summary';
import EnterHabitPage from './pages/EnterHabitPage';
import ProgressPage from './pages/ProgressPage';
import QuestionPage from './pages/QuestionPage';
import TrovePage from './pages/TrovePage';
import WhatNowPage from './pages/WhatNowPage';
export default function App() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Enter Habit" component={EnterHabitPage} />
        <Tab.Screen name="Questions" component={QuestionPage} />
        <Tab.Screen name="Overview" component={WhatNowPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    marginBottom: "auto"
  }
});

