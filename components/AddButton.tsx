// REACT HOOKS, COMPONENTS, & LIBRARIES
import { Pressable } from "react-native"
import * as Haptics from "expo-haptics"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectCurrentWeek } from "../reducers/currentWeekSlice"
import { addOccurrence, selectAddButton } from "../reducers/addButtonSlice"
import { setAddButtonPressedTrue, setAddButtonPressedFalse, selectButtonPressed } from "../reducers/buttonPressedSlice"

// STYLE
import styles from "../styles"

interface Props {
	clearData: () => void
}

export default function AddButton(props: Props) {
	// REDUX
	const dispatch = useAppDispatch()
	const buttonPressed = useAppSelector(selectButtonPressed).addButtonPressed
	const currentWeek = useAppSelector(selectCurrentWeek)

	function pressIn() {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
		dispatch(setAddButtonPressedTrue())
	}

	return (
		<Pressable
			onPressIn={pressIn}
			onPressOut={() => dispatch(setAddButtonPressedFalse())}
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
