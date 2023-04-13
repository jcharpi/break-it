import { useState, memo, useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import CustomSlider from "../components/CustomSlider";

import HabitContext from "../contexts/HabitContext";
import ResetContext from "../contexts/ResetContext";

function QuestionPage({ navigation }: any) {
    const [habit, setHabit] = useContext(HabitContext)
    const [reset, setReset] = useContext(ResetContext)

    const [goal, setGoal] = useState(0)
    const [firstOccurrence, setFirstOccurrence] = useState('weeks')
    const [frequency, setFrequency] = useState('monthly')
    const [impact, setImpact] = useState('slight')

    const occurrenceOptions = ['weeks', 'months', 'years']
    const frequencyOptions = ['monthly', 'weekly', 'daily']
    const impactOptions = ['slight', 'noticable', 'significant']

    const gemVal = occurrenceOptions.indexOf(firstOccurrence) + 
    frequencyOptions.indexOf(frequency) + (impactOptions.indexOf(impact) * 2)

    useEffect(() => {
        setHabit((prev: any) => ({
            ...prev,
            gem: gemVal < 3 ? "silver" : gemVal > 5 ? "diamond" : "gold"
          }))
    }, [gemVal])
    
    useEffect(() => {
        if(reset) {
            changeOccurrence(0)
            changeFrequency(0)
            changeImpact(0)
            setGoal(0)
        }
    }, [reset])

    function changeOccurrence(value: number) {
        setFirstOccurrence(occurrenceOptions[value] || 'weeks')
    }

    function changeFrequency(value: number) {
        setFrequency(frequencyOptions[value] || 'monthly')
    }

    function changeImpact(value: number) {
        setImpact(impactOptions[value] || 'slight')
    }

    function slidersComplete() {
        setHabit((prev: any) => {
            return {
                ...prev,
                goal: goal
            }
        })
        navigation.navigate('CreateHabitLayout', { screen: 'WhatNowPage' })    
    }

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