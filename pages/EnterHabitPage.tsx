import { StyleSheet, Text, TextInput, SafeAreaView } from "react-native"
import { memo } from "react"

function EnterHabitPage() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>What is your bad habit?</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your habit"
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
        justifyContent: "center"
    },
    
    titleText: {
        color: "white",
        fontSize: 29,
        fontWeight: "600",
        marginHorizontal: "7%",
        marginBottom: "5%"
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        fontSize: 19,
        height: 45,
        width: "80%",
        marginBottom: "10%",
        paddingLeft: 10,
    }
})