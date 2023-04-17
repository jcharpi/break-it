// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5'

// CONTEXTS
import OccurrenceContext from "../contexts/OccurrenceContext";
import CurrentWeekContext from "../contexts/CurrentWeekContext";

interface Props {
    clearData: any
}
export default function AddButton(props: Props) {
    // CONTEXTS
    const [occurrences, setOccurrences] = useContext(OccurrenceContext)
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)

    async function addOccurrence() {
        try {
          const newOccurrences = occurrences + 1
          await AsyncStorage.setItem('occurrences', newOccurrences.toString())
          setOccurrences(newOccurrences)
        } catch (error) {
          console.error('Error saving occurrence:', error)
        }
    }
    
    return (
        <TouchableOpacity 
            onPress={currentWeek === 'week9' ? props.clearData : addOccurrence} 
            style={styles.addButton}
        >
            <Icon
                name={currentWeek === 'week9' ? 'redo-alt' : 'plus'}
                size={33} 
                color='#FFD645'
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFD645',
    },
})