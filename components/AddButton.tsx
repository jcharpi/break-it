// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useState } from "react"
import { Pressable } from "react-native"
import * as Haptics from "expo-haptics"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectCurrentWeek } from "../reducers/currentWeekSlice"
import { addOccurrence } from "../reducers/occurrenceSlice"

// STYLE
import styles from "../styles"

interface Props {
	clearData: () => void
}

export default function AddButton(props: Props) {
	// CONTEXTS
	const dispatch = useAppDispatch()
	const currentWeek = useAppSelector(selectCurrentWeek)
	const [buttonPressed, setButtonPressed] = useState(false)

	function pressIn() {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
		setButtonPressed(true)
	}

	return (
		<Pressable
			onPressIn={pressIn}
			onPressOut={() => setButtonPressed(false)}
			onPress={
				currentWeek === "week9"
					? props.clearData
					: () => dispatch(addOccurrence())
			}
			style={
				buttonPressed
					? [styles.addButtonPressed, styles.addButtonShared]
					: [styles.addButton, styles.addButtonShared]
			}
		>
			<Icon
				name={currentWeek === "week9" ? "redo" : "plus"}
				size={48}
				color="#FFC333"
			/>
		</Pressable>
	)
}
