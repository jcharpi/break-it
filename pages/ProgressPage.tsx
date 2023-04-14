import { useContext, useCallback, useEffect } from "react"
import { Image, Modal, Pressable, StyleSheet, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import AddButton from "../components/AddButton"
import NavBar from "../components/NavBar"
import Summary from "../components/Summary"

import rockImage from "../images/rock.png"

import HabitContext from "../contexts/HabitContext"
import SummaryModalVisibleContext from "../contexts/SummaryModalVisibleContext"
import WhatNowModalVisibleContext from "../contexts/WhatNowModalVisibleContext"
import WeekContext from "../contexts/WeekContext"

import WhatNowPage from "./WhatNowPage"

import { currentWeek } from "../weeks";


export default function ProgressPage({ navigation }: any) {
    const [habit, setHabit] = useContext(HabitContext)
    const [summaryModalVisible, setSummaryModalVisible] = useContext(SummaryModalVisibleContext)
    const [whatNowModalVisible, setWhatNowModalVisible] = useContext(WhatNowModalVisibleContext)
    const [weeks, setWeeks] = useContext(WeekContext)

    const capitalizedHabit = habit.habitName.replace(/\b[a-z]/g, function(char: string) {
        return char.toUpperCase()
    })

    const handleHelp = useCallback(() => {
        setWhatNowModalVisible((prev: any) => !prev)
    }, [setWhatNowModalVisible])

    const handleTrove = useCallback(() => {
        navigation.navigate('TrovePage')
    }, [navigation])

    const openSummaryModal = useCallback(() => {
        setSummaryModalVisible(true)
    }, [setSummaryModalVisible])

    const closeSummaryModal = useCallback(() => {
        setSummaryModalVisible(false)
    }, [setSummaryModalVisible])

    const getCurrentWeek = async () => {
        try {
          const storedCurrentWeek = await AsyncStorage.getItem('currentWeek')
          if (storedCurrentWeek !== null) {
            return storedCurrentWeek
          }
        } catch(error) {
          console.log(error)
        }
    }

    const sameWeekCheck = async () => {
        const [storedWeek, currWeekCheck] = await Promise.all([
          getCurrentWeek(),
          currentWeek(weeks, new Date()),
        ])
        console.log(weeks)
        console.log(new Date())
        console.log(`storedWeek: ${storedWeek}`)
        console.log(`currCheckWeek: ${currWeekCheck}`)
        return currWeekCheck === undefined ? true : storedWeek === currWeekCheck;
    }

    useEffect(() => {
        const getCheckResult = async () => {
            const checkResult = await sameWeekCheck();
            console.log(checkResult)
        }
        
        if (weeks !== undefined) {
            getCheckResult();
        }
    }, [weeks])

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

                <Modal
                    animationType="slide"
                    visible={whatNowModalVisible}
                    onRequestClose={() => setWhatNowModalVisible(false)}
                    presentationStyle="pageSheet"
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