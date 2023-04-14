// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'

// CONTEXTS
import SummaryModalVisibleContext from "../contexts/SummaryModalVisibleContext";
import CurrentWeekContext from "../contexts/CurrentWeekContext";
import OccurrenceContext from "../contexts/OccurrenceContext";
import HabitContext from "../contexts/HabitContext";


export default function Summary() {
    // CONTEXTS
    const [summaryModalVisible, setSummaryModalVisible] = useContext(SummaryModalVisibleContext)
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [occurrences, setOccurrences] = useContext(OccurrenceContext)
    const [habit, setHabit] = useContext(HabitContext)

    const weekNumber = currentWeek.charAt(currentWeek.length - 1)
    function closeSummaryModal() {
        setSummaryModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.textHeader}>
                <Text style={[styles.titleText, styles.text]}>{`Week ${weekNumber}`}</Text>
                <Icon
                    onPress={closeSummaryModal}
                    style={{marginRight: "4%"}}
                    name='times' 
                    size={25} 
                    color='black'
                />
            </View>
            <Text style={[styles.bodyText, styles.text]}>Goal: {habit.goal} occurrences</Text>
            <Text style={[styles.bodyText, styles.text]}>Current: {occurrences} occurrences</Text>
            
            <Text style={[styles.bodyText, styles.text]}>
                {parseInt(weekNumber) === 9 ? `This is the last week!` : `${9-weekNumber} weeks remaining!`}
            </Text>
            
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    bodyText: {
        fontSize: 22,
        fontWeight: "400",
        lineHeight: 45,
    },
    container: {
        width: '90%',
        height: 190,
        borderRadius: 15, 
        backgroundColor: 'white'
    },
    text: {
        fontSize: 22,
        marginLeft: "4%",
    },
    textHeader: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    titleText: {
        fontWeight: "600",
        marginBottom: 5
    },
})