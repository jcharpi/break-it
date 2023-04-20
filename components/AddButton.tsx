// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext, useState } from "react"
import { Pressable } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Haptics from 'expo-haptics'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// CONTEXTS
import OccurrenceContext from "../contexts/OccurrenceContext"
import CurrentWeekContext from "../contexts/CurrentWeekContext"

// STYLE
import styles from "../styles"

interface Props {
    clearData: any
}
export default function AddButton(props: Props) {
    // CONTEXTS
    const [occurrences, setOccurrences] = useContext(OccurrenceContext)
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [buttonPressed, setButtonPressed] = useState(false)

    async function addOccurrence() {
        try {
          const newOccurrences = occurrences + 1
          await AsyncStorage.setItem("occurrences", newOccurrences.toString())
          setOccurrences(newOccurrences)
        } catch (error) {
          console.error("Error saving occurrence:", error)
        }
    }
    
    function pressIn() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        setButtonPressed(true)
    }

    return (
        <Pressable 
            onPressIn={pressIn}
            onPressOut={() => setButtonPressed(false)}
            onPress={currentWeek === "week9" ? props.clearData : addOccurrence} 
            style={buttonPressed ? [styles.addButtonPressed, styles.addButtonShared] : [styles.addButton, styles.addButtonShared]}
        >
            <Icon
                name={currentWeek === "week9" ? "redo" : "plus"}
                size={48} 
                color="#FFD645"
            />
        </Pressable>
    )
}