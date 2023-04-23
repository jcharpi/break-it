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
import HabitContext from "../contexts/HabitContext"
import ResetContext from "../contexts/ResetContext"
import SummaryModalVisibleContext from "../contexts/SummaryModalVisibleContext"
import WeekLayoutContext from "../contexts/WeekLayoutContext"
import HelpModalVisibleContext from "../contexts/HelpModalVisibleContext"

// PAGES
import HelpPage from "./HelpPage"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { resetOccurrences } from "../reducers/occurrenceSlice"

// STYLE
import styles from "../styles"

// FUNCTIONS
import { calculateCurrentWeek, calculateGoal, getWeekNumber, clearData } from "../backendFunctions"
import { addAchievement } from "../reducers/achievementSlice"
import { resetGoalDecrement, selectGoalDecrement } from "../reducers/goalDecrementSlice"

export default function ProgressPage({ navigation }: any) {
    // CONTEXTS
    const dispatch = useAppDispatch()
    const goalDecrement = useAppSelector(selectGoalDecrement)
    
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [habit, setHabit] = useContext(HabitContext)
    const [reset, setReset] = useContext(ResetContext)
    const [summaryModalVisible, setSummaryModalVisible] = useContext(SummaryModalVisibleContext)
    const [HelpModalVisible, setHelpModalVisible] = useContext(HelpModalVisibleContext)
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
        setHelpModalVisible((prev: any) => !prev)
    }

    const handleTrove = () => {
        navigation.navigate("TrovePage")
    }

    const openSummaryModal = () => {
        setSummaryModalVisible(true)
    }

    const closeSummaryModal = () => {
        setSummaryModalVisible(false)
    }

    const resetHabit = async () => {
        const newAchievement = { gem: habit.gem, habitName: capitalizedHabit }
        // try {
        //     const jsonAchievements = JSON.stringify(newAchievements)
        //     await AsyncStorage.setItem("achievements", jsonAchievements)
        //   } catch (error) {
        //     console.log(error)
        // }
        dispatch(addAchievement(newAchievement))
        dispatch(resetOccurrences())
        dispatch(resetGoalDecrement())
        clearData(navigation, setHabit, setReset, setWeeks, setCurrentWeek)
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
                <Pressable onPress={openSummaryModal}>
                    {/* SUMMARY OVERLAY */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={summaryModalVisible}
                        onRequestClose={() => setSummaryModalVisible(false)}
                        presentationStyle="overFullScreen"
                    >
                        <Pressable onPress={closeSummaryModal} style={styles.progressModalContainer}>
                            <Summary goal={goal}/>
                        </Pressable>

                    </Modal>
                    <Image source={rockImage}/>
                </Pressable>

                {/* WHAT NOW MODAL */}
                <Modal
                    animationType="slide"
                    visible={HelpModalVisible}
                    onRequestClose={() => setHelpModalVisible(false)}
                    presentationStyle="pageSheet"
                    statusBarTranslucent={true}
                >
                    <HelpPage navigation={navigation} modalView={true} />
                </Modal>
                
                <AddButton clearData={resetHabit}/>
            </View>
        </View>
    )
}