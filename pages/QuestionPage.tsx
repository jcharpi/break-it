// REACT HOOKS & COMPONENTS
import { useState, memo, useEffect } from "react"
import { Text, Alert, View } from "react-native"
import { Button } from "react-native-paper"
import * as Haptics from "expo-haptics"

// COMPONENTS
import { SliderBody } from "./../components/SliderBody"

// BACKEND FUNCTIONS
import {
	calculateWeeks,
	calculateCurrentWeek,
	getPerWeekDecrement,
} from "../backendFunctions"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
	selectButtonPressed,
	setQuestionPageButtonPressedFalse,
	setQuestionPageButtonPressedTrue,
} from "../reducers/buttonPressedSlice"
import { setInactiveSlider } from "../reducers/activeSliderSlice"
import {
	selectFirstLoad,
	setPreviouslyLoaded,
} from "../reducers/firstLoadSlice"
import { setGoalDecrement } from "../reducers/goalDecrementSlice"
import { Gem } from "../reducers/habitSlice"
import { Habit, selectHabit, setHabit } from "../reducers/habitSlice"
import {
	resetOccurrences,
	selectAddButton,
	setResetFalse,
} from "../reducers/addButtonSlice"
import { setCurrentWeek, setWeeks } from "../reducers/weekSlice"

// STYLE
import styles from "../styles"

export enum Occurrences {
  WEEKS = "weeks",
  MONTHS = "months",
  YEARS = "years"
}

export enum Frequency {
  MONTHLY = "monthly",
  WEEKLY = "weekly",
  DAILY = "daily"
}

export enum Impact {
  SLIGHT = "slight",
  NOTICEABLE = "noticeable",
  SIGNIFICANT = "significant"
}

function QuestionPage({ navigation }: any) {
	const dispatch = useAppDispatch()
	const habit = useAppSelector(selectHabit).habit
	const firstLoad = useAppSelector(selectFirstLoad)
	const reset = useAppSelector(selectAddButton).reset
	const buttonPressed =
		useAppSelector(selectButtonPressed).questionPageButtonPressed

	// SLIDER STATES
	const [goal, setGoal] = useState(0)
	const [firstOccurrence, setFirstOccurrence] = useState(Occurrences.WEEKS)
	const [frequency, setFrequency] = useState(Frequency.MONTHLY)
	const [impact, setImpact] = useState(Impact.SLIGHT)

	// CALCULATED GEM
	const gemVal =
		Object.values(Occurrences).indexOf(firstOccurrence) +
		Object.values(Frequency).indexOf(frequency) +
		Object.values(Impact).indexOf(impact) * 2

	// Update gem val based on slider values
	const updatedGemHabit = (prev: Habit) => {
		return {
			...prev,
			gem: gemVal < 3 ? Gem.SILVER : gemVal > 5 ? Gem.DIAMOND : Gem.GOLD,
		}
	}

	// reset slider on reset state
	useEffect(() => {
		if (reset) {
			changeOccurrence(0)
			changeFrequency(0)
			changeImpact(0)
			setGoal(0)
			dispatch(resetOccurrences())
		}
	}, [reset])

	// SLIDER CHANGES
	function sliderFeedback() {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
	}

	useEffect(() => {
		sliderFeedback()
	}, [firstOccurrence, frequency, impact])

	useEffect(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
	}, [goal])

  function changeOccurrence(value: number) {
		setFirstOccurrence(Object.values(Occurrences)[value] || Occurrences.WEEKS)
		dispatch(setInactiveSlider())
	}

	function changeFrequency(value: number) {
		setFrequency(Object.values(Frequency)[value] || Frequency.MONTHLY)
		dispatch(setInactiveSlider())
	}

	function changeImpact(value: number) {
		setImpact(Object.values(Impact)[value] || Impact.SLIGHT)
		dispatch(setInactiveSlider())
	}

	// UPDATE HABIT STATE VAR
	function slidersComplete(value: number) {
		const updatedGoalHabit = (prev: Habit) => {
			return {
				...prev,
				goal: value,
			}
		}
		dispatch(setHabit(updatedGoalHabit(habit)))
		sliderFeedback()
		dispatch(setInactiveSlider())
	}

	function beginButtonHandler() {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

		const calculatedWeeks = calculateWeeks(new Date())
		const currWeek = calculateCurrentWeek(calculatedWeeks, new Date())
		const goalDecrement = getPerWeekDecrement(habit.goal, 8)

		// Redirects for invalid input
		if (habit.habitName === "") {
			navigation.navigate("CreateHabitLayout", { screen: "EnterHabitPage" })
			Alert.alert("Please enter a habit name.")
		} else if (habit.goal === 0) {
			navigation.navigate("CreateHabitLayout", { screen: "QuestionPage" })
			Alert.alert("Please set a first goal.")
		} else {
			// Begin habit button was pressed => set data
			dispatch(setCurrentWeek(currWeek))
			dispatch(setWeeks(calculatedWeeks))
			dispatch(setGoalDecrement(goalDecrement))
			dispatch(setInactiveSlider())
			dispatch(setResetFalse())
			dispatch(setHabit(updatedGemHabit(habit)))

			setTimeout(() => {
				navigation.navigate("TrackHabitLayout", { screen: "ProgressPage" })
			}, 250)

			setTimeout(() => {
				dispatch(setPreviouslyLoaded())
			}, 1000)
		}
	}

	return (
		<View style={[styles.questionContainer, styles.safeArea]}>
			<Text style={styles.titleText}>A few questions...</Text>

			<SliderBody
				firstOccurrence={firstOccurrence}
				changeOccurrence={changeOccurrence}
				frequency={frequency}
				changeFrequency={changeFrequency}
				impact={impact}
				changeImpact={changeImpact}
				goal={goal}
				setGoal={setGoal}
				slidersComplete={slidersComplete}
			/>

			<Button
				mode="elevated"
				onPressIn={() => dispatch(setQuestionPageButtonPressedTrue())}
				onPressOut={() => dispatch(setQuestionPageButtonPressedFalse())}
				onPress={beginButtonHandler}
				buttonColor={"white"}
				textColor={"#586183"}
				labelStyle={styles.helpButtonText}
				contentStyle={styles.helpButtonContainer}
				style={
					buttonPressed
						? firstLoad
							? [styles.helpButtonPressed, styles.firstLoadPressed]
							: styles.helpButtonPressed
						: firstLoad
						? [styles.helpButton, styles.firstLoad]
						: styles.helpButton
				}
			>
				Begin
			</Button>
		</View>
	)
}

export default memo(QuestionPage)
