import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import CreateHabitLayout from './layouts/CreateHabitLayout';
import ProgressPage from './pages/ProgressPage';
import TrovePage from './pages/TrovePage';

export default function App() {
  const Stack = createStackNavigator()
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='CreateHabitLayout'>
        <Stack.Screen
          name="CreateHabitLayout"
          component={CreateHabitLayout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProgressPage"
          component={ProgressPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrovePage"
          component={TrovePage}
          options={{ headerShown: false }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}


