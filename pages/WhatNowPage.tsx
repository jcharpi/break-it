import { memo, useContext } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from 'react-native-vector-icons/FontAwesome5'

import HabitContext from "../contexts/HabitContext";
import ResetContext from "../contexts/ResetContext";
import WhatNowModalVisibleContext from "../contexts/WhatNowModalVisibleContext";
import WeekContext from "../contexts/WeekContext";

import { calculateWeeks, currentWeek } from "../weeks";

interface Weeks {
    [key: string]: Date;
}

interface WhatNowPageProps {
    navigation: any
    modalView?: boolean
    closeModal?: any
}

function WhatNowPage({ navigation, modalView }: WhatNowPageProps) {
    const [habit, setHabit] = useContext(HabitContext)
    const [reset, setReset] = useContext(ResetContext)
    const [weeks, setWeeks] = useContext(WeekContext)
    const [whatNowModalVisible, setWhatNowModalVisible] = useContext(WhatNowModalVisibleContext)

    
    const storeData = async (habit: object, weeks: object, currentWeek: any) => {
        try {
            const jsonHabit = JSON.stringify(habit)
            await AsyncStorage.setItem('habit', jsonHabit)

            const jsonWeek = JSON.stringify(weeks)
            await AsyncStorage.setItem('weeks', jsonWeek)
            
            await AsyncStorage.setItem('currentWeek', currentWeek)
        } catch (error) {
            console.log(error)
        }
    }

    const clearData = async () => {
        try {
            await AsyncStorage.removeItem('habit')
            await AsyncStorage.removeItem('weeks')
            await AsyncStorage.removeItem('currentWeek')
            await AsyncStorage.setItem('occurrences', '0')
        } catch (error) {
            console.log(error)
        }
    }

    function closeWhatNowModal() {
        setWhatNowModalVisible(false)
    }

    function buttonHandler() {
        if(modalView) {
            closeWhatNowModal() 

            setWeeks({})
            setTimeout(() => {
                navigation.navigate('CreateHabitLayout', { screen: 'EnterHabitPage' })
            }, 300)

            setTimeout(() => {
                setHabit({
                    habitName: "",
                    gem: "silver",
                    goal: 0,  
                })
            }, 500)
            clearData()
            setReset(true)
        } else {
            const calculatedWeeks = calculateWeeks(new Date())
            setReset(false)
            storeData(habit, calculatedWeeks, currentWeek(calculatedWeeks, new Date()))

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
                1. Each time you act on your habit, hit the + button.
                </Text>

                <Text style={styles.bodyText}>
                    2. Each week your rock will update! Cracks indicate progress. Tap your
                    rock to see your week’s current progress.
                </Text>

                <Text style={styles.bodyText}>
                    3. After you have successfully broken your habit, you will get a gem as a 
                    reward, which can be viewed in your treasure trove!
                </Text>

                <Text style={styles.bodyText}>
                    4. Show off your trove and enter a new habit!
                </Text>
            </View>

            <Pressable style={modalView ? [styles.button, {borderColor: '#FF2300'}] : styles.button} onPress={buttonHandler}>
                <Text style={modalView ? [styles.buttonText, {color: '#FF2300'}] : styles.buttonText}>{modalView ? 'Change Habit' : 'Begin'}</Text>
            </Pressable>
            
        </SafeAreaView>
    )
}

export default memo(WhatNowPage)


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183",
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