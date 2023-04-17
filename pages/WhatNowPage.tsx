// REACT HOOKS, COMPONENTS, & LIBRARIES
import { memo, useContext } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View, Alert, Platform, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5'

// CONTEXTS
import HabitContext from "../contexts/HabitContext";
import ResetContext from "../contexts/ResetContext";
import WhatNowModalVisibleContext from "../contexts/WhatNowModalVisibleContext";
import WeekLayoutContext from "../contexts/WeekLayoutContext";
import CurrentWeekContext from "../contexts/CurrentWeekContext";
import OccurrenceContext from "../contexts/OccurrenceContext";
import GoalDecrementContext from "../contexts/GoalDecrementContext";

// BACKEND FUNCTIONS
import { calculateWeeks, calculateCurrentWeek, getPerWeekDecrement, clearData } from "../functions";
import { TouchableOpacity } from "react-native-gesture-handler";

// DETERMINES IF MODAL VIEW OR NOT
interface WhatNowPageProps {
    navigation: any
    modalView?: boolean
    closeModal?: any
}

function WhatNowPage({ navigation, modalView }: WhatNowPageProps) {
    // CONTEXTS
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [habit, setHabit] = useContext(HabitContext)
    const [reset, setReset] = useContext(ResetContext)
    const [occurrences, setOccurrences] = useContext(OccurrenceContext)
    const [weeks, setWeeks] = useContext(WeekLayoutContext)
    const [weekDecrement, setWeekDecrement] = useContext(GoalDecrementContext)
    const [whatNowModalVisible, setWhatNowModalVisible] = useContext(WhatNowModalVisibleContext)

    interface Habit {
        habitName: string,
        gem: string,
        goal: number,
    }

    // SAVE DATA TO ASYNCSTORAGE
    const storeData = async (habit: Habit, weeks: object, currWeek: any, goalDecrement: number) => {
        try {
            const jsonHabit = JSON.stringify(habit)
            await AsyncStorage.setItem('habit', jsonHabit)

            const jsonWeek = JSON.stringify(weeks)
            await AsyncStorage.setItem('weeks', jsonWeek)
            
            await AsyncStorage.setItem('currentWeek', currWeek)

            await AsyncStorage.setItem('goalDecrement', goalDecrement.toString())
        } catch (error) {
            console.log(error)
        }
    }

    // EVENT FUNCTIONS
    function closeWhatNowModal() {
        setWhatNowModalVisible(false)
    }

    function buttonHandler() {
        if(modalView) {
            closeWhatNowModal() 

            // Resets habit to prepare for new one
            clearData(navigation, setHabit, setReset, setWeeks, setWeekDecrement, setOccurrences, setCurrentWeek)
        } else {
            const calculatedWeeks = calculateWeeks(new Date())
            const currWeek = calculateCurrentWeek(calculatedWeeks, new Date())
            const goalDecrement = getPerWeekDecrement(habit.goal, 9)  

            // Begin habit button was pressed => set data
            setReset(false)
            setCurrentWeek(currWeek)
            setWeekDecrement(goalDecrement)
            storeData(habit, calculatedWeeks, currWeek, goalDecrement)

            // Redirects for invalid input
            if (habit.habitName === "") {
                navigation.navigate('CreateHabitLayout', { screen: 'EnterHabitPage' }) 
                Alert.alert('Please enter a habit name.')
            } else if (habit.goal === 0) {
                navigation.navigate('CreateHabitLayout', { screen: 'QuestionPage' }) 
                Alert.alert('Please set a first goal.')
            } else {
                navigation.navigate('TrackHabitLayout', { screen: 'ProgressPage' })
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexHeader}>
                <Text style={styles.titleText}>What now?</Text>
                {modalView && 
                <Icon
                    onPress={closeWhatNowModal}
                    style={{marginRight: "7%"}}
                    name='times' 
                    size={30} 
                    color='white'
                />}
            </View>

            <View style={styles.body}>
                <Text style={styles.bodyText}>
                    Your rock represents your bad habit! 
                    Each time you act on your habit, hit the plus button.
                </Text>

                <Text style={styles.bodyText}>
                    Tap your rock to see your week’s current progress.
                </Text>

                <Text style={styles.bodyText}>
                    After you have broken your habit, you will get a gem as a 
                    reward, which can be viewed in your treasure trove!
                </Text>

                <Text style={styles.bodyText}>
                    Show off your trove and enter a new habit!
                </Text>
            </View>

            <TouchableOpacity style={modalView ? [styles.button, {borderColor: '#ff8383'}] : styles.button} onPress={buttonHandler}>
                <Text style={modalView ? [styles.buttonText, {color: '#ff8383'}] : styles.buttonText}>
                    {modalView ? 'Change Habit' : 'Begin'}
                </Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}

export default memo(WhatNowPage)


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    body: {
        marginHorizontal: "7%",
    },
    bodyText: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
        marginVertical: 25
    },
    button: {
        width: 200,
        height: 50,
        marginTop: 30,
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "400",
        color: "white"
    },
    flexHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    titleText: {
        color: "white",
        fontSize: 29,
        fontWeight: "600",
        marginLeft: "7%",
        marginTop: "10%",
    },
})