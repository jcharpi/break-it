import { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SummaryModalVisibleContext from '../contexts/SummaryModalVisibleContext';

import ProgressPage from '../pages/ProgressPage';
import TrovePage from '../pages/TrovePage';


const Tab = createMaterialTopTabNavigator();

export default function TrackHabitLayout() {
    const [summaryModalVisible, setSummaryModalVisible] = useState(false);

    return (
        <SummaryModalVisibleContext.Provider value={[summaryModalVisible, setSummaryModalVisible]}>
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
        </SummaryModalVisibleContext.Provider>
    )
}