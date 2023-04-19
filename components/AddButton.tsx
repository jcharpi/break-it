// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext, useState } from "react"
import { Pressable } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/FontAwesome5"

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
    
    return (
        <Pressable 
            onPressIn={() => setButtonPressed(true)}
            onPressOut={() => setButtonPressed(false)}
            onPress={currentWeek === "week9" ? props.clearData : addOccurrence} 
            style={buttonPressed ? styles.addButtonPressed : styles.addButton}
        >
            <Icon
                name={currentWeek === "week9" ? "redo-alt" : "plus"}
                size={33} 
                color="#FFD645"
            />
        </Pressable>
    )
}