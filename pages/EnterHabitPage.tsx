import { memo, useCallback } from "react"
import { StyleSheet, Text, TextInput, SafeAreaView } from "react-native"

function EnterHabitPage({ navigation }: any) {
    const submitHabit = useCallback(() => {
        navigation.navigate('QuestionPage')
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>What is your bad habit?</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your habit"
                autoCapitalize="words"
                autoCorrect={true}
                clearButtonMode="while-editing" // iOS only
                maxLength={30}
                returnKeyType="next"
                onSubmitEditing={submitHabit}
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
    textInput: {
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 2,
        borderStyle: 'solid',
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
        marginBottom: "5%"
    },
})