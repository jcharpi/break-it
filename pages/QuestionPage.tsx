// REACT HOOKS & COMPONENTS
import { useState, memo, useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

// CUSTOM COMPONENTS
import CustomSlider from "../components/CustomSlider";

// CONTEXTS
import HabitContext from "../contexts/HabitContext";
import ResetContext from "../contexts/ResetContext";

function QuestionPage({ navigation }: any) {
    // CONTEXTS
    const [habit, setHabit] = useContext(HabitContext)
    const [reset, setReset] = useContext(ResetContext)

    // SLIDER STATES
    const [goal, setGoal] = useState(0)
    const [firstOccurrence, setFirstOccurrence] = useState('weeks')
    const [frequency, setFrequency] = useState('monthly')
    const [impact, setImpact] = useState('slight')

    // SLIDER OPTIONS
    const occurrenceOptions = ['weeks', 'months', 'years']
    const frequencyOptions = ['monthly', 'weekly', 'daily']
    const impactOptions = ['slight', 'noticable', 'significant']

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
        setFirstOccurrence(occurrenceOptions[value] || 'weeks')
    }

    function changeFrequency(value: number) {
        setFrequency(frequencyOptions[value] || 'monthly')
    }

    function changeImpact(value: number) {
        setImpact(impactOptions[value] || 'slight')
    }

    // UPDATE HABIT STATE VAR
    function slidersComplete() {
        setHabit((prev: any) => {
            return {
                ...prev,
                goal: goal
            }
        })
        navigation.navigate('CreateHabitLayout', { screen: 'WhatNowPage' })    
    }

    // SET FIRST GOAL
    function changeGoal(value: number) {
        setGoal(value)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>A few questions...</Text>
            
            <Text style={styles.bodyText}>First occurrence was <Text style={styles.valueText}>{firstOccurrence}</Text> ago</Text>
            <CustomSlider onValueChange={changeOccurrence} maximumValue={2} trackMarks={[0, 1, 2]}/>

            <Text style={styles.bodyText}>I engage in this habit <Text style={styles.valueText}>{frequency}</Text></Text>
            <CustomSlider onValueChange={changeFrequency} maximumValue={2} trackMarks={[0, 1, 2]}/>

            <Text style={styles.bodyText}>This habit has had a <Text style={styles.valueText}>{impact}</Text> impact</Text>
            <CustomSlider onValueChange={changeImpact} maximumValue={2} trackMarks={[0, 1, 2]}/>

            <Text style={styles.bodyText}>My first limit is <Text style={styles.valueText}>{goal}</Text> times a week</Text>
            <CustomSlider onValueChange={changeGoal} maximumValue={100} trackMarks={[0, 100]} onSlidingComplete={slidersComplete} />
        </SafeAreaView>
    )
}

export default memo(QuestionPage)


const styles = StyleSheet.create({
    bodyText: {
        color: "white",
        fontSize: 19,
        fontWeight: "400",
        marginHorizontal: "7%",
        marginTop: "16%"
    },
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183",
    },
    titleText: {
        color: "white",
        fontSize: 29,
        fontWeight: "600",
        marginHorizontal: "7%",
        marginTop: "10%"
    },
    valueText: {
        fontWeight: "700"
    }
})