// REACT HOOKS & COMPONENTS
import { memo, useEffect } from "react"
import { Text, TextInput, View } from "react-native"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
	resetHabit,
	selectHabit,
	setHabit,
	Habit,
	resetHabitName,
} from "../reducers/habitSlice"
import { selectAddButton } from "../reducers/addButtonSlice"
import { resetGoalDecrement } from "../reducers/goalDecrementSlice"
import { resetWeeks, resetCurrentWeek } from "../reducers/weekSlice"
import {
	setHelpModalInvisible,
	setSummaryModalInvisible,
} from "../reducers/modalVisibleSlice"
import { setInactiveSlider } from "../reducers/activeSliderSlice"

// STYLE
import styles from "../styles"

function EnterHabitPage({ navigation }: any) {
	const dispatch = useAppDispatch()
	const habit = useAppSelector(selectHabit).habit
	const reset = useAppSelector(selectAddButton).reset

	// EVENT FUNCTIONS
	function submitHabit() {
		navigation.navigate("QuestionPage")
	}

	function changeHabitName(habitNameInput: string) {
		const updatedHabit = (prev: Habit) => {
			return {
				...prev,
				habitName: habitNameInput,
			}
		}
		dispatch(setHabit(updatedHabit(habit)))
	}

	function newHabit() {
		// Hide modal views
		dispatch(setHelpModalInvisible())
		dispatch(setSummaryModalInvisible())

		// Allow swiping gestures on question page
		dispatch(setInactiveSlider())

		// Reset week data => allow for new week recalculation
		dispatch(resetGoalDecrement())
		dispatch(resetWeeks())

		// Hide name for cleaner look on fade to EnterHabitPage. Need timeout for habit so rock image does not change when switching screens
		dispatch(resetHabitName())
		setTimeout(() => {
			dispatch(resetCurrentWeek())
			dispatch(resetHabit())
		}, 500)
	}

	useEffect(() => {
		if (reset) {
			newHabit()
		}
	}, [reset])

	return (
		<View style={styles.enterContainer}>
			<Text style={styles.titleText}>What is your bad habit?</Text>
			<TextInput
				style={styles.enterTextInput}
				placeholder="Enter your habit"
				clearButtonMode="while-editing"
				maxLength={20}
				returnKeyType="done"
				onSubmitEditing={submitHabit}
				onChangeText={changeHabitName}
				value={habit.habitName}
			/>
		</View>
	)
}

export default memo(EnterHabitPage)
