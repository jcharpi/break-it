// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext, useEffect } from "react"
import { Image, Modal, Pressable, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// CUSTOM COMPONENTS & MODALS
import AddButton from "../components/AddButton"
import NavBar from "../components/NavBar"
import Summary from "../components/Summary"

// CUSTOM IMAGES
import rockImage from "../images/rock.png"

// CONTEXTS
import CurrentWeekContext from "../contexts/CurrentWeekContext"
import WeekLayoutContext from "../contexts/WeekLayoutContext"

// PAGES
import HelpPage from "./HelpPage"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addAchievement } from "../reducers/achievementSlice"
import { resetGoalDecrement, selectGoalDecrement } from "../reducers/goalDecrementSlice"
import { resetHabit, selectHabit } from "../reducers/habitSlice"
import { selectHelpModalVisible, setHelpModalInvisible, toggleHelpModalVisible } from "../reducers/helpModalVisibleSlice"
import { resetOccurrences } from "../reducers/occurrenceSlice"
import { setResetTrue } from "../reducers/resetSlice"
import { selectSummaryModalVisible, setSummaryModalInvisible, setSummaryModalVisible } from "../reducers/summaryModalVisibleSlice"

// STYLE
import styles from "../styles"

// FUNCTIONS
import { calculateCurrentWeek, calculateGoal, getWeekNumber, clearData } from "../backendFunctions"

export default function ProgressPage({ navigation }: any) {
    // CONTEXTS
    const dispatch = useAppDispatch()
    const habit = useAppSelector(selectHabit)
    const goalDecrement = useAppSelector(selectGoalDecrement)
    const helpModalVisible = useAppSelector(selectHelpModalVisible)
    const summaryModalVisible = useAppSelector(selectSummaryModalVisible)

    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [weeks, setWeeks] = useContext(WeekLayoutContext)

    // CUSTOM FUNCTIONS
    const currWeekCheck = calculateCurrentWeek(weeks, new Date())
    const weekNumber = currentWeek === undefined ? 1 : getWeekNumber(currentWeek)
    const goal = calculateGoal(habit.goal, goalDecrement, weekNumber)

    // NAVBAR FUNCTIONS
    const capitalizedHabit = habit.habitName.replace(/(^|\s)([a-z])/g, function(char: string) {
        return char.toUpperCase()
    }).trim()

    const handleHelp = () => {
        dispatch(toggleHelpModalVisible())
    }

    const handleTrove = () => {
        navigation.navigate("TrovePage")
    }

    const prepareNewHabit = async () => {
        const newAchievement = { gem: habit.gem, habitName: capitalizedHabit }
        dispatch(addAchievement(newAchievement))
        dispatch(resetHabit())
        dispatch(resetOccurrences())
        dispatch(resetGoalDecrement())
        dispatch(setResetTrue())
        clearData(navigation, setWeeks, setCurrentWeek)
    }
    
    // WEEK UPDATE
    // using sameWeekCheck in the useEffect to compare last 
    // stored currentWeek and what currentWeek SHOULD be
    const sameWeekCheck = () => {
        const result = currWeekCheck === undefined ? true : currentWeek === currWeekCheck
        if(!result) {
            setCurrentWeek(currWeekCheck)
            dispatch(resetOccurrences())
            if(currWeekCheck !== undefined) {
                AsyncStorage.setItem("currentWeek", currWeekCheck)
            }
        }
    }

    useEffect(() => {
        // Waits for state values to update from AsyncStorage
        if (weeks !== undefined && currentWeek !== undefined) {
            sameWeekCheck()
        }
    }, [weeks, currentWeek])

    return (
        <View style={styles.progressContainer}>
            <NavBar 
                handleLeftIcon={handleHelp}
                handleRightIcon={handleTrove}
                leftIconName="help"
                rightIconName="treasure-chest"
                title={capitalizedHabit}
            />

            <View style={styles.progressFlexView}>
                <Pressable onPress={() => dispatch(setSummaryModalVisible())}>
                    {/* SUMMARY OVERLAY */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={summaryModalVisible}
                        onRequestClose={() => dispatch(setSummaryModalInvisible())}
                        presentationStyle="overFullScreen"
                    >
                        <Pressable onPress={() => dispatch(setSummaryModalInvisible())} style={styles.progressModalContainer}>
                            <Summary goal={goal}/>
                        </Pressable>

                    </Modal>
                    <Image style={styles.progressRock} source={rockImage}/>
                </Pressable>

                {/* WHAT NOW MODAL */}
                <Modal
                    animationType="slide"
                    visible={helpModalVisible}
                    onRequestClose={() => dispatch(setHelpModalInvisible())}
                    presentationStyle="pageSheet"
                    statusBarTranslucent={true}
                >
                    <HelpPage navigation={navigation} modalView={true} />
                </Modal>
                
                <AddButton clearData={prepareNewHabit}/>
            </View>
        </View>
    )
}