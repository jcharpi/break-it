// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"

// CONTEXTS
import SummaryModalVisibleContext from "../contexts/SummaryModalVisibleContext"
import CurrentWeekContext from "../contexts/CurrentWeekContext"
import OccurrenceContext from "../contexts/OccurrenceContext"

// CUSTOM FUNCTIONS
import { getWeekNumber } from "../functions"

// STYLE
import styles from "../styles"

interface Props {
    goal: number
}

export default function Summary(props: Props) {
    // CONTEXTS
    const [summaryModalVisible, setSummaryModalVisible] = useContext(SummaryModalVisibleContext)
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [occurrences, setOccurrences] = useContext(OccurrenceContext)

    const weekNumber = getWeekNumber(currentWeek)
    function closeSummaryModal() {
        setSummaryModalVisible(false)
    }

    return (
        <View style={styles.summaryContainer}>

            <View style={styles.summaryHeader}>
                <Text style={[styles.summaryTitle, styles.summaryText]}>
                    {weekNumber === 10 ? "Congratulations 🥳" : `Week ${weekNumber}`}
                </Text>

                <TouchableOpacity onPress={closeSummaryModal}
>
                    <Icon
                        style={{marginRight: "4%"}}
                        name="times" 
                        size={25} 
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            {
            weekNumber === 10 ?           
            <View>
                <Text style={[styles.summaryBody, styles.summaryText]}>You have broken your habit!</Text>
                <Text style={[styles.summaryBody, styles.summaryText]}>Ready to break another one?</Text>
            </View>
            : 
            <View>
                <Text style={[styles.summaryBody, styles.summaryText]}>Goal: {props.goal} occurrences</Text>
                <Text style={[styles.summaryBody, styles.summaryText]}>Current: <Text style={{color: occurrences <= props.goal ? "green": "red", fontWeight: "600"}}>
                        {occurrences}
                </Text> occurrences</Text>
                
                <Text style={[styles.summaryBody, styles.summaryText]}>
                    {weekNumber === 9 ? "This is the last week!" : `${9-weekNumber} weeks remaining!`}
                </Text>
            </View>
            }
            
        </View>
    )
}
