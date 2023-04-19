// REACT HOOKS & COMPONENTS
import { useState, memo, useContext, useEffect } from "react"
import { SafeAreaView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// CUSTOM COMPONENTS
import CustomSlider from "../components/CustomSlider"

// CONTEXTS
import CurrentWeekContext from "../contexts/CurrentWeekContext"
import FirstLoadContext from "../contexts/FirstLoadContext"
import HabitContext from "../contexts/HabitContext"
import ResetContext from "../contexts/ResetContext"
import GoalDecrementContext from "../contexts/GoalDecrementContext"

// BACKEND FUNCTIONS
import { calculateWeeks, calculateCurrentWeek, getPerWeekDecrement } from "../functions"

// STYLE
import styles from "../styles"
import { Button } from "react-native-paper";
import { Alert } from "react-native";

function QuestionPage({ navigation }: any) {
    interface Habit {
        habitName: string,
        gem: string,
        goal: number,
    }

    // CONTEXTS
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [firstLoad, setFirstLoad] = useContext(FirstLoadContext)
    const [habit, setHabit] = useContext(HabitContext)
    const [reset, setReset] = useContext(ResetContext)
    const [weekDecrement, setWeekDecrement] = useContext(GoalDecrementContext)

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
        setHabit((prev: any) => ({
            ...prev,
            gem: gemVal < 3 ? "silver" : gemVal > 5 ? "diamond" : "gold"
          }))
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
    function slidersComplete() {
        setHabit((prev: any) => {
            return {
                ...prev,
                goal: goal
            }
        })
    }

    // SET FIRST GOAL
    function changeGoal(value: number) {
        setGoal(value)
    }

    // BUTTON FUNCTIONS
    const storeData = async (habit: Habit, weeks: object, currWeek: any, goalDecrement: number) => {
        try {
            const jsonHabit = JSON.stringify(habit)
            await AsyncStorage.setItem("habit", jsonHabit)

            const jsonWeek = JSON.stringify(weeks)
            await AsyncStorage.setItem("weeks", jsonWeek)
            
            await AsyncStorage.setItem("currentWeek", currWeek)

            await AsyncStorage.setItem("goalDecrement", goalDecrement.toString())

            await AsyncStorage.setItem("firstLoad", "false")
        } catch (error) {
            console.log(error)
        }
    }


    function buttonHandler() {
        const calculatedWeeks = calculateWeeks(new Date())
        const currWeek = calculateCurrentWeek(calculatedWeeks, new Date())
        const goalDecrement = getPerWeekDecrement(habit.goal, 8)  

        // Begin habit button was pressed => set data
        setCurrentWeek(currWeek)
        setFirstLoad(false)
        setReset(false)
        setWeekDecrement(goalDecrement)
        storeData(habit, calculatedWeeks, currWeek, goalDecrement)

        // Redirects for invalid input
        if (habit.habitName === "") {
            navigation.navigate("CreateHabitLayout", { screen: "EnterHabitPage" }) 
            Alert.alert("Please enter a habit name.")
        } else if (habit.goal === 0) {
            navigation.navigate("CreateHabitLayout", { screen: "QuestionPage" }) 
            Alert.alert("Please set a first goal.")
        } else {
            navigation.navigate("TrackHabitLayout", { screen: "ProgressPage" })
        }
        
    }

    return (
        <SafeAreaView style={styles.questionContainer}>
            <Text style={styles.titleText}>A few questions...</Text>
            
            <Text style={styles.bodyText}>First occurrence was <Text style={styles.questionValue}>{firstOccurrence}</Text> ago</Text>
            <CustomSlider onValueChange={changeOccurrence} maximumValue={2} trackMarks={[0, 1, 2]}/>

            <Text style={styles.bodyText}>I engage in this habit <Text style={styles.questionValue}>{frequency}</Text></Text>
            <CustomSlider onValueChange={changeFrequency} maximumValue={2} trackMarks={[0, 1, 2]}/>

            <Text style={styles.bodyText}>This habit has had a <Text style={styles.questionValue}>{impact}</Text> impact</Text>
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
                style={buttonPressed ? styles.helpButtonPressed : styles.helpButton}
            >
                Begin
            </Button>
        </SafeAreaView>
    )
}

export default memo(QuestionPage)
