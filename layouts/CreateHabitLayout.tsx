// REACT HOOKS & COMPONENTS
import { useContext, useState } from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Icon from "react-native-vector-icons/Ionicons"

// PAGES
import EnterHabitPage from "../pages/EnterHabitPage"
import QuestionPage from "../pages/QuestionPage"
import HelpPage from "../pages/HelpPage"

// CONTEXTS
import FirstLoadContext from "../contexts/FirstLoadContext"
import ActiveSliderContext from "../contexts/ActiveSliderContext"

// STYLE
import styles from "../styles"

const Tab = createMaterialTopTabNavigator()

export default function CreateHabitLayout() {
    const [firstLoad, setFirstLoad] = useContext(FirstLoadContext)
    const [activeSlider, setActiveSlider] = useState(false)

    return (
        <ActiveSliderContext.Provider value={[activeSlider, setActiveSlider]}>
            <Tab.Navigator 
                initialRouteName="HelpPage" 
                tabBar={firstLoad ? undefined : () => null}
                backBehavior="history" 
                tabBarPosition="bottom"
                screenOptions={
                    firstLoad ?
                    {
                        tabBarIcon: ({ focused, color }) => {
                            let iconName        
                            iconName = focused ? "ellipse" : "ellipse-outline"
                            color = focused ? "#DDE2F5" : "white"
                            return <Icon name={iconName} size={25} color={color} />
                        },
                        tabBarShowLabel: false,
                        tabBarStyle: styles.createTabBar,
                        tabBarContentContainerStyle: styles.createTabBarContainer,
                        tabBarItemStyle: styles.createTabBarItem,
                        tabBarIndicatorStyle: { opacity: 0 },
                        tabBarGap: 2,
                        tabBarAndroidRipple: {color: "transparent"},
                    } 
                    : 
                    {
                        tabBarAndroidRipple: {color: "transparent"},
                    }
                }
            >
                {
                firstLoad && 
                <Tab.Screen 
                    name="HelpPage" 
                    component={HelpPage} 
                    options={{swipeEnabled: true}}
                />
                }
                <Tab.Screen 
                    name="EnterHabitPage" 
                    component={EnterHabitPage} 
                    options={
                        {swipeEnabled: true}
                    }
                />
                <Tab.Screen 
                    name="QuestionPage"
                    component={QuestionPage} 
                    options={{swipeEnabled: activeSlider ? false : true}}
                />
            </Tab.Navigator>
        </ActiveSliderContext.Provider>

    )
}