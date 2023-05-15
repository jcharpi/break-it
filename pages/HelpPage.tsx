// REACT HOOKS, COMPONENTS, & LIBRARIES
import { memo } from "react"
import { Text, View, Alert, TouchableOpacity } from "react-native"
import { Button } from "react-native-paper"
import * as Haptics from "expo-haptics"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
	selectButtonPressed,
	setHelpPageButtonPressedFalse,
	setHelpPageButtonPressedTrue,
} from "../reducers/buttonPressedSlice"
import { selectCurrentWeek } from "../reducers/currentWeekSlice"
import { setHelpModalInvisible } from "../reducers/modalVisibleSlice"
import { setResetTrue } from "../reducers/addButtonSlice"

// STYLE
import styles from "../styles"

// DETERMINES IF MODAL VIEW OR NOT
import { HelpPageText } from './../components/HelpPageText'

interface HelpPageProps {
	navigation: any
	modalView?: boolean
}

function HelpPage({ navigation, modalView }: HelpPageProps) {
	// REDUX
	const dispatch = useAppDispatch()
	const buttonPressed =
		useAppSelector(selectButtonPressed).helpPageButtonPressed
	const currentWeek = useAppSelector(selectCurrentWeek)

	function changeHabitAlert() {
		Alert.alert(
			"Change Habit",
			"All progress made on your current habit will be lost!",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => {
						navigation.navigate("CreateHabitLayout", {
							screen: "EnterHabitPage",
						})
						dispatch(setResetTrue())
					},
					style: "destructive",
				},
			]
		)
	}

	function buttonHandler() {
		if (modalView) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
			changeHabitAlert()
		} else {
			navigation.navigate("CreateHabitLayout", { screen: "EnterHabitPage" })
		}
	}

	return (
		<View style={[styles.helpContainer, styles.safeArea]}>
			<View style={styles.helpFlexHeader}>
				<Text style={styles.titleText}>
					{modalView ? "Help" : "Welcome! 👋"}
				</Text>
				{modalView && (
					<TouchableOpacity onPress={() => dispatch(setHelpModalInvisible())}>
						<Icon
							style={{ marginRight: "7%" }}
							name="close-thick"
							size={30}
							color="white"
						/>
					</TouchableOpacity>
				)}
			</View>

			<HelpPageText modalView={modalView}  />

			{modalView &&
				(currentWeek !== "week9" ? (
					<Button
						mode="elevated"
						onPressIn={() => dispatch(setHelpPageButtonPressedTrue())}
						onPressOut={() => dispatch(setHelpPageButtonPressedFalse())}
						onPress={buttonHandler}
						buttonColor={"#dd1e00"}
						textColor={"white"}
						labelStyle={styles.helpButtonText}
						contentStyle={[styles.helpButtonContainer]}
						style={
							buttonPressed
								? [styles.helpButtonPressed, { marginTop: 8 }]
								: [styles.helpButton, { marginTop: 5 }]
						}
					>
						Change Habit
					</Button>
				) : (
					<Text style={styles.bodyText}>
						Add your habit to your trove by clicking the button on your habit
						page!
					</Text>
				))}
		</View>
	)
}

export default memo(HelpPage)
