// REACT HOOKS, COMPONENTS, & LIBRARIES
import { memo, useContext, useState } from "react"
import { SafeAreaView, Text, View, Alert, TouchableOpacity } from "react-native"
import { Button } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// CONTEXTS
import HabitContext from "../contexts/HabitContext"
import ResetContext from "../contexts/ResetContext"
import HelpModalVisibleContext from "../contexts/HelpModalVisibleContext"
import WeekLayoutContext from "../contexts/WeekLayoutContext"
import CurrentWeekContext from "../contexts/CurrentWeekContext"
import OccurrenceContext from "../contexts/OccurrenceContext"
import GoalDecrementContext from "../contexts/GoalDecrementContext"

// BACKEND FUNCTIONS
import { clearData } from "../functions"

// STYLE
import styles from "../styles"

// DETERMINES IF MODAL VIEW OR NOT
interface HelpPageProps {
    navigation: any
    modalView?: boolean
    closeModal?: any
}

function HelpPage({ navigation, modalView }: HelpPageProps) {
    // CONTEXTS
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [habit, setHabit] = useContext(HabitContext)
    const [reset, setReset] = useContext(ResetContext)
    const [occurrences, setOccurrences] = useContext(OccurrenceContext)
    const [weeks, setWeeks] = useContext(WeekLayoutContext)
    const [weekDecrement, setWeekDecrement] = useContext(GoalDecrementContext)
    const [HelpModalVisible, setHelpModalVisible] = useContext(HelpModalVisibleContext)

    const [buttonPressed, setButtonPressed] = useState(false)

    // EVENT FUNCTIONS
    function closeHelpModal() {
        setHelpModalVisible(false)
    }

    function buttonHandler() {
        if(modalView) {
            Alert.alert("Change Habit", "All progress made on your current habit will be lost!", [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK", onPress: () => {
                        closeHelpModal() 

                        // Resets habit to prepare for new one
                        clearData(navigation, setHabit, setReset, setWeeks, setWeekDecrement, setOccurrences, setCurrentWeek)
                    },
                    style: "destructive"
                },
            ])
        } else {
            navigation.navigate("CreateHabitLayout", { screen: "EnterHabitPage" })
        }
    }

    return (
        <SafeAreaView style={styles.helpContainer}>
            <View style={styles.helpFlexHeader}>
                <Text style={styles.titleText}>{modalView ? "Help" : "Welcome!"}</Text>
                {modalView && 
                <TouchableOpacity onPress={closeHelpModal}>
                    <Icon
                        style={{marginRight: "7%"}}
                        name="close-thick" 
                        size={30} 
                        color="white"
                    />
                </TouchableOpacity>
                }
            </View>

            <View>
                <Text style={styles.bodyText}>
                    Your rock represents your bad habit! 
                    Each time you act on your habit, hit the plus button.
                </Text>

                <Text style={styles.bodyText}>
                    Tap your rock to see your week’s current progress.
                </Text>

                <Text style={styles.bodyText}>
                    After you have broken your habit, you will get a gem as a 
                    reward, which can be viewed in your treasure trove!
                </Text>

                <Text style={styles.bodyText}>
                    Show off your trove and enter a new habit!
                </Text>
            </View>

            {
                modalView && 
                <Button 
                    mode="elevated" 
                    onPressIn={() => setButtonPressed(true)}
                    onPressOut={() => setButtonPressed(false)}
                    onPress={buttonHandler}
                    buttonColor={"#dd1e00"}
                    textColor={"white"}
                    labelStyle={styles.helpButtonText}
                    contentStyle={styles.helpButtonContainer}
                    style={buttonPressed ? [styles.helpButtonPressed, {marginTop: 83}] : [styles.helpButton, {marginTop: 80}]}
                >
                    Change Habit
                </Button>
            }
            
        </SafeAreaView>
    )
}

export default memo(HelpPage)