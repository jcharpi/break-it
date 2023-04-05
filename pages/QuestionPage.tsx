import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useState, memo } from "react";
import CustomSlider from "../components/CustomSlider";

function QuestionPage() {

    const [firstOccurrence, setFirstOccurrence] = useState('days')
    const [frequency, setFrequency] = useState('daily')
    const [impact, setImpact] = useState('slight')
    const [firstGoal, setFirstGoal] = useState(0)

    const occurrenceOptions = ['days', 'weeks', 'months', 'years']
    const frequencyOptions = ['daily', 'weekly', 'monthly']
    const impactOptions = ['slight', 'noticable', 'significant']

    function changeOccurrence(value: number) {
        setFirstOccurrence(occurrenceOptions[value] || 'days')
    }

    function changeFrequency(value: number) {
        setFrequency(frequencyOptions[value] || 'daily')
    }

    function changeImpact(value: number) {
        setImpact(impactOptions[value] || 'slight')
    }

    function changeFirstGoal(value: number) {
        setFirstGoal(value)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>A few questions...</Text>
            <Text style={styles.bodyText}>First occurrence was <Text style={styles.valueText}>{firstOccurrence}</Text> ago</Text>
            <CustomSlider onValueChange={changeOccurrence} maximumValue={3} trackMarks={[0, 1, 2, 3]}/>

            <Text style={styles.bodyText}>I engage in this habit <Text style={styles.valueText}>{frequency}</Text></Text>
            <CustomSlider onValueChange={changeFrequency} maximumValue={2} trackMarks={[0, 1, 2]}/>

            <Text style={styles.bodyText}>This habit has had a <Text style={styles.valueText}>{impact}</Text> impact</Text>
            <CustomSlider onValueChange={changeImpact} maximumValue={2} trackMarks={[0, 1, 2]}/>

            <Text style={styles.bodyText}>My first limit is <Text style={styles.valueText}>{firstGoal}</Text> times a week</Text>
            <CustomSlider onValueChange={changeFirstGoal} maximumValue={100} trackMarks={[0, 100]}/>
            
        </SafeAreaView>
    )
}

export default memo(QuestionPage)


const styles = StyleSheet.create({
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
    bodyText: {
        color: "white",
        fontSize: 19,
        fontWeight: "400",
        marginHorizontal: "7%",
        marginTop: "16%"
    },
    valueText: {
        fontWeight: "700"
    }
})