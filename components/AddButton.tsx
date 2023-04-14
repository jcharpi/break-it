// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext } from "react";
import { StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5'

// CONTEXTS
import OccurrenceContext from "../contexts/OccurrenceContext";

export default function AddButton() {
    const [occurrences, setOccurrences] = useContext(OccurrenceContext)
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
        <Pressable onPress={addOccurrence} style={styles.addButton}>
            <Icon
                name='plus' 
                size={33} 
                color='#FFD645'
            />
        </Pressable>
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