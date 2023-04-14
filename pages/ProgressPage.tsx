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
import HabitContext from "../contexts/HabitContext"
import SummaryModalVisibleContext from "../contexts/SummaryModalVisibleContext"
import WhatNowModalVisibleContext from "../contexts/WhatNowModalVisibleContext"
import WeekLayoutContext from "../contexts/WeekLayoutContext"
import CurrentWeekContext from "../contexts/CurrentWeekContext"
import OccurrenceContext from "../contexts/OccurrenceContext"

// PAGES
import WhatNowPage from "./WhatNowPage"

// FUNCTIONS
import { calculateCurrentWeek } from "../weeks";


export default function ProgressPage({ navigation }: any) {
    // CONTEXTS
    const [habit, setHabit] = useContext(HabitContext)
    const [summaryModalVisible, setSummaryModalVisible] = useContext(SummaryModalVisibleContext)
    const [whatNowModalVisible, setWhatNowModalVisible] = useContext(WhatNowModalVisibleContext)
    const [weeks, setWeeks] = useContext(WeekLayoutContext)
    const [currentWeek, setCurrentWeek] = useContext(CurrentWeekContext)
    const [occurrences, setOccurrences] = useContext(OccurrenceContext)

    // CHECK
    const currWeekCheck = calculateCurrentWeek(weeks, new Date())
    const storeCurrentWeek = async (week: any) => {
        try {
            await AsyncStorage.setItem('currentWeek', week)
        } catch (error) {
            console.log(error)
        }
    }
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
            }
        }
    }
    
    useEffect(() => {
        const getCheckResult = () => {
            sameWeekCheck()
        }
        
        // Waits for state values to update from AsyncStorage
        if (weeks !== undefined && currentWeek !== undefined) {
            getCheckResult()
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
                            <Summary/>
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
                
                <AddButton/>
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