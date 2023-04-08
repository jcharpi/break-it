import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateHabitLayout from './layouts/CreateHabitLayout';
import TrackHabitLayout from './layouts/TrackHabitLayout';
import WhatNowModalContext from './contexts/shatNowModalContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [whatNowModalVisible, setWhatNowModalVisible] = useState(false);

  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"

  return (
    <WhatNowModalContext.Provider value={[whatNowModalVisible, setWhatNowModalVisible]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="CreateHabitLayout" component={CreateHabitLayout} options={{gestureEnabled: false}}/>
          <Stack.Screen name="TrackHabitLayout" component={TrackHabitLayout} options={{gestureEnabled: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </WhatNowModalContext.Provider>
    
  );
}


