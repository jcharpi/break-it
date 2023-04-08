import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState } from 'react';
import ProgressPage from '../pages/ProgressPage';
import TrovePage from '../pages/TrovePage';
import SummaryModalContext from '../contexts/summaryModalContext';

const Tab = createMaterialTopTabNavigator();

export default function TrackHabitLayout() {
    const [summaryModalVisible, setSummaryModalVisible] = useState(false);

    return (
        <SummaryModalContext.Provider value={[summaryModalVisible, setSummaryModalVisible]}>
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
        </SummaryModalContext.Provider>
    )
}