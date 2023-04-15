// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'

// CONTEXTS
import SummaryModalVisibleContext from "../contexts/SummaryModalVisibleContext";
import CurrentWeekContext from "../contexts/CurrentWeekContext";
import OccurrenceContext from "../contexts/OccurrenceContext";

// CUSTOM FUNCTIONS
import { getWeekNumber } from "../weeks";

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
        <View style={styles.container}>

            <View style={styles.textHeader}>
                <Text style={[styles.titleText, styles.text]}>
                    {weekNumber === 10 ? `Congratulations 🥳` : `Week ${weekNumber}`}
                </Text>

                <Icon
                    onPress={closeSummaryModal}
                    style={{marginRight: "4%"}}
                    name='times' 
                    size={25} 
                    color='black'
                />
            </View>

            {
            weekNumber === 10 ?           
            <View>
                <Text style={[styles.bodyText, styles.text]}>You have broken your habit!</Text>
                <Text style={[styles.bodyText, styles.text]}>Ready to break another one?</Text>
            </View>
            : 
            <View>
                <Text style={[styles.bodyText, styles.text]}>Goal: {props.goal} occurrences</Text>
                <Text style={[styles.bodyText, styles.text]}>Current: <Text style={{color: occurrences < props.goal ? 'green': 'red', fontWeight: `600`}}>
                        {occurrences}
                </Text> occurrences</Text>
                
                <Text style={[styles.bodyText, styles.text]}>
                    {weekNumber === 9 ? `This is the last week!` : `${9-weekNumber} weeks remaining!`}
                </Text>
            </View>
            }
            
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