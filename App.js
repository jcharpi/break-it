import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

import CreateHabitLayout from './layouts/CreateHabitLayout';
import TrackHabitLayout from './layouts/TrackHabitLayout';
import WhatNowModalVisibleContext from './contexts/WhatNowModalVisibleContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [whatNowModalVisible, setWhatNowModalVisible] = useState(false);

  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"

  return (
    <WhatNowModalVisibleContext.Provider value={[whatNowModalVisible, setWhatNowModalVisible]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="CreateHabitLayout" component={CreateHabitLayout} options={{gestureEnabled: false}}/>
          <Stack.Screen name="TrackHabitLayout" component={TrackHabitLayout} options={{gestureEnabled: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </WhatNowModalVisibleContext.Provider>
  );
}


