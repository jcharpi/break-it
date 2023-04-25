// REACT HOOKS & COMPONENTS
import { useState, memo, useContext, useEffect } from "react"
import { SafeAreaView, Text, Alert } from "react-native"
import { Button } from "react-native-paper"
import * as Haptics from 'expo-haptics'
import AsyncStorage from "@react-native-async-storage/async-storage"

// CUSTOM COMPONENTS
import CustomSlider from "../components/CustomSlider"

// BACKEND FUNCTIONS
import { calculateWeeks, calculateCurrentWeek, getPerWeekDecrement } from "../backendFunctions"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setInactiveSlider } from "../reducers/activeSliderSlice"
import { selectFirstLoad, setPreviouslyLoaded } from "../reducers/firstLoadSlice"
import { setGoalDecrement } from "../reducers/goalDecrementSlice"
import { Gem } from "../reducers/habitSlice"
import { Habit, selectHabit, setHabit } from "../reducers/habitSlice"
import { selectReset, setResetFalse } from "../reducers/resetSlice"
import { Weeks, selectWeeks, setWeeks } from "../reducers/weekSlice"

// STYLE
import styles from "../styles"
import { setCurrentWeek } from "../reducers/currentWeekSlice"


function QuestionPage({ navigation }: any) {
    const dispatch = useAppDispatch()
    const habit = useAppSelector(selectHabit)
    const firstLoad = useAppSelector(selectFirstLoad)
    const reset = useAppSelector(selectReset)

    const [buttonPressed, setButtonPressed] = useState(false)


    // SLIDER STATES
    const [goal, setGoal] = useState(0)
    const [firstOccurrence, setFirstOccurrence] = useState("weeks")
    const [frequency, setFrequency] = useState("monthly")
    const [impact, setImpact] = useState("slight")

    // SLIDER OPTIONS
    const occurrenceOptions = ["weeks", "months", "years"]
    const frequencyOptions = ["monthly", "weekly", "daily"]
    const impactOptions = ["slight", "noticable", "significant"]

    // CALCULATED GEM
    const gemVal = occurrenceOptions.indexOf(firstOccurrence) + 
    frequencyOptions.indexOf(frequency) + (impactOptions.indexOf(impact) * 2)

    // Update gem val based on slider values
    useEffect(() => {
        const updatedGemHabit = (prev: Habit) => {
            return {
                ...prev,
                gem: gemVal < 3 ? Gem.SILVER : (gemVal > 5 ? Gem.DIAMOND : Gem.GOLD)
                
            }
        }
        dispatch(setHabit(updatedGemHabit(habit)))
    }, [gemVal])
    
    // reset slider on reset state
    useEffect(() => {
        if(reset) {
            changeOccurrence(0)
            changeFrequency(0)
            changeImpact(0)
            setGoal(0)
        }
    }, [reset])

    // SLIDER CHANGES
    function sliderFeedback() {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    }

    useEffect(() => {
        sliderFeedback()
    }, [firstOccurrence, frequency, impact])

    useEffect(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }, [goal])


    function changeOccurrence(value: number) {
        setFirstOccurrence(occurrenceOptions[value] || "weeks")
    }

    function changeFrequency(value: number) {
        setFrequency(frequencyOptions[value] || "monthly")
    }

    function changeImpact(value: number) {
        setImpact(impactOptions[value] || "slight")
    }

    // UPDATE HABIT STATE VAR
    function slidersComplete(value: number) {
        const updatedGoalHabit = (prev: Habit) => {
            return {
                ...prev,
                goal: value
            }
        }
        dispatch(setHabit(updatedGoalHabit(habit)))
        sliderFeedback()
        dispatch(setInactiveSlider())
    }

    // SET FIRST GOAL
    function changeGoal(value: number) {
        setGoal(value)
    }

    function buttonHandler() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

        const calculatedWeeks = calculateWeeks(new Date())
        const currWeek = calculateCurrentWeek(calculatedWeeks, new Date())
        const goalDecrement = getPerWeekDecrement(habit.goal, 8)  
        
        // Redirects for invalid input
        if (habit.habitName === "") {
            navigation.navigate("CreateHabitLayout", { screen: "EnterHabitPage" }) 
            Alert.alert("Please enter a habit name.")
        } else if (habit.goal === 0) {
            navigation.navigate("CreateHabitLayout", { screen: "QuestionPage" }) 
            Alert.alert("Please set a first goal.")
        } else {
            // Begin habit button was pressed => set data
            dispatch(setCurrentWeek(currWeek))
            dispatch(setWeeks(calculatedWeeks))
            dispatch(setGoalDecrement(goalDecrement))
            dispatch(setInactiveSlider())
            dispatch(setResetFalse())

            navigation.navigate("TrackHabitLayout", { screen: "ProgressPage" })

            setTimeout(() => {
                dispatch(setPreviouslyLoaded())
            }, 1000)
        }
        
    }

    return (
        <SafeAreaView style={styles.questionContainer}>
            <Text style={styles.titleText}>A few questions...</Text>
            
            <Text style={styles.bodyText}>First occurrence was <Text style={styles.questionValue}>{firstOccurrence}</Text> ago</Text>
            <CustomSlider onValueChange={changeOccurrence} maximumValue={2} trackMarks={[0, 1, 2]}/>

            <Text style={styles.bodyText}>I engage in this habit <Text style={styles.questionValue}>{frequency}</Text></Text>
            <CustomSlider onValueChange={changeFrequency} maximumValue={2} trackMarks={[0, 1, 2]}/>

            <Text style={styles.bodyText}>This habit has a <Text style={styles.questionValue}>{impact}</Text> impact</Text>
            <CustomSlider onValueChange={changeImpact} maximumValue={2} trackMarks={[0, 1, 2]}/>

            <Text style={styles.bodyText}>My first limit is <Text style={styles.questionValue}>{goal}</Text> times a week</Text>
            <CustomSlider onValueChange={changeGoal} maximumValue={100} trackMarks={[0, 100]} onSlidingComplete={slidersComplete} />
        
            <Button 
                mode="elevated" 
                onPressIn={() => setButtonPressed(true)}
                onPressOut={() => setButtonPressed(false)}
                onPress={buttonHandler}
                buttonColor={"white"}
                textColor={"#586183"}
                labelStyle={styles.helpButtonText}
                contentStyle={styles.helpButtonContainer}
                style={
                    buttonPressed 
                    ? 
                        firstLoad ? styles.helpButtonPressed : [styles.helpButtonPressed, {marginTop: 83}] 
                    :  
                        firstLoad ? styles.helpButton : [styles.helpButton, {marginTop: 80}]
                }
            >
                Begin
            </Button>
        </SafeAreaView>
    )
}

export default memo(QuestionPage)
