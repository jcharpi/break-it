// REACT HOOKS & COMPONENTS
import { memo, useContext } from "react"
import { StyleSheet, Text, TextInput, SafeAreaView, Platform, StatusBar } from "react-native"

// CONTEXTS
import HabitContext from "../contexts/HabitContext";

function EnterHabitPage({ navigation }: any) {
    // CONTEXTS
    const [habit, setHabit] = useContext(HabitContext)
    
    // EVENT FUNCTIONS
    const submitHabit = () => {
        navigation.navigate('QuestionPage')
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
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>What is your bad habit?</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your habit"
                clearButtonMode="while-editing" // iOS only
                maxLength={20}
                returnKeyType="next"
                onSubmitEditing={submitHabit}
                onChangeText={changeHabitName}
                value={habit.habitName}
            /> 
        </SafeAreaView>
    )
}

export default memo(EnterHabitPage)


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 2,
        fontSize: 19,
        height: 45,
        width: "80%",
        marginBottom: "10%",
        paddingLeft: 10,
    },
    titleText: {
        color: "white",
        fontSize: 29,
        fontWeight: "600",
        marginHorizontal: "7%",
        marginBottom: "5%",
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.2,
    },
})