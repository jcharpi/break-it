// REACT HOOKS & COMPONENTS
import { memo, useEffect } from "react"
import { Text, TextInput, SafeAreaView } from "react-native"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { resetHabit, selectHabit, setHabit, Habit } from "../reducers/habitSlice"
import { resetOccurrences, selectAddButton } from "../reducers/addButtonSlice"
import { resetGoalDecrement } from "../reducers/goalDecrementSlice"
import { resetWeeks } from "../reducers/weekSlice"
import { resetCurrentWeek } from "../reducers/currentWeekSlice"
import { setHelpModalInvisible, setSummaryModalInvisible } from "../reducers/modalVisibleSlice"
import { setInactiveSlider } from "../reducers/activeSliderSlice"

// STYLE
import styles from "../styles"

function EnterHabitPage({ navigation }: any) {
	const dispatch = useAppDispatch()
	const habit = useAppSelector(selectHabit)
  const reset = useAppSelector(selectAddButton).reset
	// EVENT FUNCTIONS
	const submitHabit = () => {
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

  useEffect(() => {
    if(reset) {
      dispatch(setHelpModalInvisible())
      dispatch(setSummaryModalInvisible())

			dispatch(setInactiveSlider())

		  dispatch(resetOccurrences())
		  dispatch(resetGoalDecrement())
		  dispatch(resetWeeks())

      dispatch(resetCurrentWeek())
      dispatch(resetHabit())
    }
	}, [reset])

	return (
		<SafeAreaView style={styles.enterContainer}>
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
		</SafeAreaView>
	)
}

export default memo(EnterHabitPage)
