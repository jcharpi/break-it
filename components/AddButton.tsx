// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext, useState } from "react"
import { Pressable } from "react-native"
import * as Haptics from 'expo-haptics'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// CONTEXTS
import CurrentWeekContext from "../contexts/CurrentWeekContext"

// REDUX
import { useAppDispatch } from "../app/hooks"
import { addOccurrence } from "../reducers/occurrenceSlice"

// STYLE
import styles from "../styles"

interface Props {
    clearData: any
}

export default function AddButton(props: Props) {
    // CONTEXTS
    const dispatch = useAppDispatch()
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [buttonPressed, setButtonPressed] = useState(false)

    function pressIn() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        setButtonPressed(true)
    }

    return (
        <Pressable 
            onPressIn={pressIn}
            onPressOut={() => setButtonPressed(false)}
            onPress={currentWeek === "week9" ? props.clearData : () => dispatch(addOccurrence())} 
            style={buttonPressed ? [styles.addButtonPressed, styles.addButtonShared] : [styles.addButton, styles.addButtonShared]}
        >
            <Icon
                name={currentWeek === "week9" ? "redo" : "plus"}
                size={48} 
                color="#FFC333"
            />
        </Pressable>
    )
}