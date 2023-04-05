import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import { useState } from 'react';
import CreateHabitLayout from './layouts/CreateHabitLayout';
import ProgressPage from './pages/ProgressPage';
import TrovePage from './pages/TrovePage';
import ModalViewContext from './contexts/ModalViewContext';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"

  return (
    <ModalViewContext.Provider value={[modalVisible, setModalVisible]}>
      <NavigationContainer>
        <Tab.Navigator 
          initialRouteName='CreateHabitLayout'
          tabBar={() => null}
          screenOptions={{
            lazy: true,
            lazyPreloadDistance: 2,
          }}
        >
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
    </ModalViewContext.Provider>
    
  );
}


