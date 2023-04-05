import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProgressPage from '../pages/ProgressPage';
import TrovePage from '../pages/TrovePage';

const Tab = createMaterialTopTabNavigator();

export default function TrackHabitLayout() {
    return (
        <Tab.Navigator 
          initialRouteName='ProgressPage'
          tabBar={() => null}
          screenOptions={{
            lazy: true,
            lazyPreloadDistance: 2,
          }}
        >
            <Tab.Screen
                name="ProgressPage"
                component={ProgressPage}
            />
            <Tab.Screen
                name="TrovePage"
                component={TrovePage}
            />
        </Tab.Navigator>
    )
}