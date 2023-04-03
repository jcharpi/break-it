import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import CreateHabitLayout from './layouts/CreateHabitLayout';
import ProgressPage from './pages/ProgressPage';
import TrovePage from './pages/TrovePage';

export default function App() {
  const Tab = createMaterialTopTabNavigator();
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"

  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName='CreateHabitLayout'
        tabBar={() => null}>
        <Tab.Screen
          name="CreateHabitLayout"
          component={CreateHabitLayout}
          options={{ swipeEnabled: false }}
          />
        <Tab.Screen
          name="ProgressPage"
          component={ProgressPage}
        />
        <Tab.Screen
          name="TrovePage"
          component={TrovePage}
        />
       
      </Tab.Navigator>
    </NavigationContainer>
  );
}


