// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useEffect } from "react"

import {
	Alert,
	Image,
	ImageSourcePropType,
	Pressable,
	View,
} from "react-native"
import * as Haptics from "expo-haptics"

// CUSTOM COMPONENTS & MODALS
import AddButton from "../components/AddButton"
import NavBar from "../components/NavBar"

// CUSTOM IMAGES
import week1_rock from "../images/rocks/week1.png"
import week2_rock from "../images/rocks/week2.png"
import week3_rock from "../images/rocks/week3.png"
import week4_rock from "../images/rocks/week4.png"
import week5_rock from "../images/rocks/week5.png"
import week6_rock from "../images/rocks/week6.png"
import week7_rock from "../images/rocks/week7.png"
import week8_rock from "../images/rocks/week8.png"
import week9_silver_rock from "../images/rocks/week9_silver.png"
import week9_gold_rock from "../images/rocks/week9_gold.png"
import week9_diamond_rock from "../images/rocks/week9_diamond.png"
import silver from "../images/silver.png"
import gold from "../images/gold.png"
import diamond from "../images/diamond.png"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addAchievement } from "../reducers/achievementSlice"
import {
	resetCurrentWeek,
	selectCurrentWeek,
	setCurrentWeek,
} from "../reducers/currentWeekSlice"
import {
	resetGoalDecrement,
	selectGoalDecrement,
	setGoalDecrement,
} from "../reducers/goalDecrementSlice"
import {
	completedHabit,
	selectHabit,
	setGoalExceededCheckFalse,
	setGoalExceededCheckTrue,
	setHabit,
} from "../reducers/habitSlice"
import {
	toggleHelpModalVisible,
	setSummaryModalInvisible,
	setSummaryModalVisible,
} from "../reducers/modalVisibleSlice"
import {
	resetOccurrences,
	selectAddButton,
	setResetTrue,
} from "../reducers/addButtonSlice"
import { resetWeeks, selectWeeks, setWeeks } from "../reducers/weekSlice"

// PAGES
import { WhatNowModal } from "./../components/WhatNowModal"
import { SummaryModal } from "./../components/SummaryModal"

// STYLE
import styles from "../styles"

// FUNCTIONS
import {
	calculateCurrentWeek,
	calculateGoal,
	calculateWeeks,
	getPerWeekDecrement,
	getWeekNumber,
} from "../backendFunctions"

export default function ProgressPage({ navigation }: any) {
	// REDUX
	const dispatch = useAppDispatch()
	const currentWeek = useAppSelector(selectCurrentWeek)
	const goalDecrement = useAppSelector(selectGoalDecrement)
	const habit = useAppSelector(selectHabit).habit
	const completed = useAppSelector(selectHabit).completed
	const goalExceededCheck = useAppSelector(selectHabit).goalExceededCheck
	const occurrences = useAppSelector(selectAddButton).occurrences
	const weeks = useAppSelector(selectWeeks)

	// CUSTOM FUNCTIONS
	const currWeekCheck = calculateCurrentWeek(weeks, new Date())
	const weekNumber = currentWeek === "" ? 0 : getWeekNumber(currentWeek)
	const goal = calculateGoal(habit.goal, goalDecrement, weekNumber)

	const images: Record<string, ImageSourcePropType> = {
		week0: week1_rock,
		week1: week2_rock,
		week2: week3_rock,
		week3: week4_rock,
		week4: week5_rock,
		week5: week6_rock,
		week6: week7_rock,
		week7: week8_rock,
		week8_silver: week9_silver_rock,
		week8_gold: week9_gold_rock,
		week8_diamond: week9_diamond_rock,
		week9_silver: silver,
		week9_gold: gold,
		week9_diamond: diamond,
	}

	// NAVBAR FUNCTIONS
	const capitalizedHabit = habit.habitName
		.replace(/(^|\s)([a-z])/g, function (char: string) {
			return char.toUpperCase()
		})
		.trim()

	const handleHelp = () => {
		dispatch(toggleHelpModalVisible())
	}

	const handleTrove = () => {
		navigation.navigate("TrovePage")
	}

	function getImageByName(): ImageSourcePropType {
		if (weekNumber < 9 && weekNumber > 0) {
			return images[currentWeek]
		} else if (weekNumber === 9) {
			return images[`week8_${habit.gem}`]
		} else if (weekNumber === 10 || completed) {
			return images[`week9_${habit.gem}`]
		}

		return images["week0"]
	}

	// Prepare new habit to be created, add completed habit to TrovePage
	function clearData() {
		const newAchievement = { gem: habit.gem, habitName: capitalizedHabit }
		navigation.navigate("CreateHabitLayout", {
			screen: "EnterHabitPage",
		})
		dispatch(setResetTrue())
		dispatch(addAchievement(newAchievement))
	}

	function resetCurrentHabit() {
		// Set up new habit based on current habit
		const resetHabit = {
			...habit,
			goal: goal,
		}
		const calculatedWeeks = calculateWeeks(new Date())
		const currWeek = calculateCurrentWeek(calculatedWeeks, new Date())
		const goalDecrement = getPerWeekDecrement(goal, 8)

		setTimeout(() => {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
		}, 50)

		Alert.alert(
			"Goal Exceeded",
			"Choose to continue or reset your habit with this week's current goal as a starting point.",
			[
				{
					text: "Reset",
					style: "destructive",
					onPress: () => {
						// hide modal
						dispatch(setSummaryModalInvisible())

						// reset weeks
						dispatch(resetGoalDecrement())
						dispatch(resetWeeks())
						dispatch(resetOccurrences())

						// use current week to reset habit
						dispatch(setHabit(resetHabit))
						dispatch(setCurrentWeek(currWeek))
						dispatch(setWeeks(calculatedWeeks))
						dispatch(setGoalDecrement(goalDecrement))
					},
				},
				{
					text: "Continue",
					style: "default",
					onPress: () => {
						dispatch(setGoalExceededCheckTrue())
					},
				},
			]
		)
	}

	function sameWeekCheck() {
		const result = currWeekCheck === "" ? true : currentWeek === currWeekCheck

		// If current week is not what it should be => update it to be desired week
		if (!result) {
			currWeekCheck === ""
				? dispatch(resetCurrentWeek())
				: dispatch(setCurrentWeek(currWeekCheck))
			dispatch(resetOccurrences())
			dispatch(setGoalExceededCheckFalse())
		}
	}

	// Check if week needs to be updated on app reload
	useEffect(() => {
		if (weeks !== undefined && currentWeek !== undefined) {
			sameWeekCheck()
		}
	}, [weeks, currentWeek])

	useEffect(() => {
		// change ProgressPage, HelpPage, & SummaryPage to reflect finished habit
		if (weekNumber === 10) {
			dispatch(completedHabit())
		}

		// reset current habit to week1
		if (occurrences > goal && occurrences - goal === 1 && !goalExceededCheck) {
			resetCurrentHabit()
		}

		// If user reloads app while creating a habit, reset their progress
		if (currentWeek === "") {
			navigation.navigate("CreateHabitLayout", { screen: "EnterHabitPage" })
		}
	}, [weekNumber, occurrences])

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
					<SummaryModal goal={goal} />
					<Image
						style={[styles.progressRock, completed ? styles.gemRock : {}]}
						source={getImageByName()}
						resizeMode="contain"
					/>
				</Pressable>

				<WhatNowModal navigation={navigation} />

				<AddButton clearData={clearData} />
			</View>
		</View>
	)
}
