// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext, useEffect } from "react"
import { Image, Modal, Pressable, StyleSheet, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// CUSTOM COMPONENTS & MODALS
import AddButton from "../components/AddButton"
import NavBar from "../components/NavBar"
import Summary from "../components/Summary"

// CUSTOM IMAGES
import rockImage from "../images/rock.png"

// CONTEXTS
import CurrentWeekContext from "../contexts/CurrentWeekContext"
import GoalDecrementContext from "../contexts/GoalDecrementContext"
import HabitContext from "../contexts/HabitContext"
import OccurrenceContext from "../contexts/OccurrenceContext"
import ResetContext from "../contexts/ResetContext"
import SummaryModalVisibleContext from "../contexts/SummaryModalVisibleContext"
import WeekLayoutContext from "../contexts/WeekLayoutContext"
import WhatNowModalVisibleContext from "../contexts/WhatNowModalVisibleContext"

// PAGES
import WhatNowPage from "./WhatNowPage"

// FUNCTIONS
import { calculateCurrentWeek, calculateGoal, getWeekNumber, clearData } from "../functions";

export default function ProgressPage({ navigation }: any) {
    // CONTEXTS
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [habit, setHabit] = useContext(HabitContext)
    const [occurrences, setOccurrences] = useContext(OccurrenceContext)
    const [reset, setReset] = useContext(ResetContext)
    const [summaryModalVisible, setSummaryModalVisible] = useContext(SummaryModalVisibleContext)
    const [weekDecrement, setWeekDecrement] = useContext(GoalDecrementContext)
    const [whatNowModalVisible, setWhatNowModalVisible] = useContext(WhatNowModalVisibleContext)
    const [weeks, setWeeks] = useContext(WeekLayoutContext)


    // CUSTOM FUNCTIONS
    const currWeekCheck = calculateCurrentWeek(weeks, new Date())
    const weekNumber = currentWeek === undefined ? 1 : getWeekNumber(currentWeek)
    const goal = calculateGoal(habit.goal, weekDecrement, weekNumber)

    // NAVBAR FUNCTIONS
    const capitalizedHabit = habit.habitName.replace(/\b[a-z]/g, function(char: string) {
        return char.toUpperCase()
    })

    const handleHelp = () => {
        setWhatNowModalVisible((prev: any) => !prev)
    }

    const handleTrove = () => {
        navigation.navigate('TrovePage')
    }

    const openSummaryModal = () => {
        setSummaryModalVisible(true)
    }

    const closeSummaryModal = () => {
        setSummaryModalVisible(false)
    }

    const resetHabit = () => {
        clearData(navigation, setHabit, setReset, setWeeks, setWeekDecrement, setOccurrences, setCurrentWeek)
    }
    // WEEK UPDATE
    // using sameWeekCheck in the useEffect to compare last 
    // stored currentWeek and what currentWeek SHOULD be
    const sameWeekCheck = () => {
        console.log(`storedWeek: ${currentWeek}`)
        console.log(weeks)
        console.log(`currCheckWeek: ${currWeekCheck}`)
        const result = currWeekCheck === undefined ? true : currentWeek === currWeekCheck;
        if(!result) {
            setCurrentWeek(currWeekCheck)
            setOccurrences(0)
            if(currWeekCheck !== undefined) {
                AsyncStorage.setItem('currentWeek', currWeekCheck)
                AsyncStorage.setItem('occurrences', '0')
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
        <View style={styles.container}>
            <NavBar 
                handleLeftIcon={handleHelp}
                handleRightIcon={handleTrove}
                leftIconName='question'
                rightIconName='mountain'
                title={capitalizedHabit}
            />
            <View style={styles.flexView}>
                <Pressable onPress={openSummaryModal}>
                    {/* SUMMARY OVERLAY */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={summaryModalVisible}
                        onRequestClose={() => setSummaryModalVisible(false)}
                        presentationStyle="overFullScreen"
                    >
                        <View style={styles.modalContainer}>
                            <Summary goal={goal}/>
                        </View>
                        <Pressable style={styles.modalOverlay} onPress={closeSummaryModal} />
                    </Modal>
                    <Image source={rockImage}/>
                </Pressable>

                {/* WHAT NOW MODAL */}
                <Modal
                    animationType="slide"
                    visible={whatNowModalVisible}
                    onRequestClose={() => setWhatNowModalVisible(false)}
                    presentationStyle="pageSheet"
                    statusBarTranslucent={true}
                >
                    <WhatNowPage navigation={navigation} modalView={true} />
                </Modal>
                
                <AddButton clearData={resetHabit}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183"
    },
    flexView: {
        marginTop: "40%",
        flexDirection: "column",
        alignItems:"center",
        gap: 60
    }, 
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalOverlay: {  
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})