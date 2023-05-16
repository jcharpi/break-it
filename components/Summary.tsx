// REACT HOOKS, COMPONENTS, & LIBRARIES
import { View, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// CUSTOM FUNCTIONS
import { getWeekNumber } from "../backendFunctions"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectAddButton } from "../reducers/addButtonSlice"
import { selectWeeks } from "../reducers/weekSlice"
import { setSummaryModalInvisible } from "../reducers/modalVisibleSlice"

// STYLE
import styles from "../styles"

interface Props {
	goal: number
}

export default function Summary(props: Props) {
	// REDUX
	const dispatch = useAppDispatch()
	const occurrences = useAppSelector(selectAddButton).occurrences
	const currentWeek = useAppSelector(selectWeeks).currentWeek

	const weekNumber = getWeekNumber(currentWeek)

	return (
		<View style={styles.summaryContainer}>
			<View style={styles.summaryHeader}>
				<Text style={[styles.summaryTitle, styles.summaryText]}>
					{weekNumber === 10 ? "Congratulations 🥳" : `Week ${weekNumber}`}
				</Text>

				<TouchableOpacity onPress={() => dispatch(setSummaryModalInvisible())}>
					<Icon
						style={{ marginRight: "4%" }}
						name="close-thick"
						size={25}
						color="black"
					/>
				</TouchableOpacity>
			</View>

			{weekNumber === 10 ? (
				<View>
					<Text style={[styles.summaryBody, styles.summaryText]}>
						You have broken your habit!
					</Text>
					<Text style={[styles.summaryBody, styles.summaryText]}>
						Ready to break another one?
					</Text>
				</View>
			) : (
				<View>
					<Text style={[styles.summaryBody, styles.summaryText]}>
						Goal: {props.goal} occurrences
					</Text>
					<Text style={[styles.summaryBody, styles.summaryText]}>
						Current:{" "}
						<Text
							style={{
								color: occurrences <= props.goal ? "green" : "red",
								fontWeight: "600",
							}}
						>
							{occurrences}
						</Text>{" "}
						occurrences
					</Text>

					<Text style={[styles.summaryBody, styles.summaryText]}>
						{weekNumber === 9
							? "This is the last week!"
							: `${9 - weekNumber} weeks remaining!`}
					</Text>
				</View>
			)}
		</View>
	)
}
