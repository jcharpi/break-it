// REACT HOOKS & COMPONENTS
import { memo } from "react"
import { Text, TextInput, SafeAreaView } from "react-native"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectHabit, setHabit } from "../reducers/habitSlice"
import { Habit } from "../reducers/habitSlice"

// STYLE
import styles from "../styles"


function EnterHabitPage({ navigation }: any) {
    const dispatch = useAppDispatch()
    const habit = useAppSelector(selectHabit)
    // EVENT FUNCTIONS
    const submitHabit = () => {
        navigation.navigate("QuestionPage")
    }


    function changeHabitName (habitNameInput: string) {
        const updatedHabit = (prev: Habit) => {
            return {
                ...prev,
                habitName: habitNameInput
            }
        }
        dispatch(setHabit(updatedHabit(habit)))
    }

    return (
        <SafeAreaView style={styles.enterContainer}>
            <Text style={styles.titleText}>What is your bad habit?</Text>
            <TextInput
                style={styles.enterTextInput}
                placeholder="Enter your habit"
                clearButtonMode="while-editing"
                maxLength={20}
                returnKeyType="done"
                onSubmitEditing={submitHabit}
                onChangeText={changeHabitName}
                value={habit.habitName}
            /> 
        </SafeAreaView>
    )
}

export default memo(EnterHabitPage)
