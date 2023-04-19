// REACT HOOKS & COMPONENTS
import { memo, useContext } from "react"
import { Text, TextInput, SafeAreaView } from "react-native"

// STYLE
import styles from "../styles"

// CONTEXTS
import HabitContext from "../contexts/HabitContext"

function EnterHabitPage({ navigation }: any) {
    // CONTEXTS
    const [habit, setHabit] = useContext(HabitContext)
    
    // EVENT FUNCTIONS
    const submitHabit = () => {
        navigation.navigate("QuestionPage")
    }


    function changeHabitName (habitNameInput: string) {
        setHabit((prev: any) => {
            return {
                ...prev,
                habitName: habitNameInput
            }
        })
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
