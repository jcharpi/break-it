// REACT HOOKS, COMPONENTS, & LIBRARIES
import { memo } from "react"
import { SafeAreaView, Text, View, Alert, TouchableOpacity } from "react-native"
import { Button } from "react-native-paper"
import * as Haptics from "expo-haptics"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectButtonPressed, setHelpPageButtonPressedFalse, setHelpPageButtonPressedTrue } from "../reducers/buttonPressedSlice"
import {
	selectCurrentWeek,
} from "../reducers/currentWeekSlice"
import { setHelpModalInvisible } from "../reducers/modalVisibleSlice"
import { setResetTrue } from "../reducers/addButtonSlice"

// STYLE
import styles from "../styles"

// DETERMINES IF MODAL VIEW OR NOT
interface HelpPageProps {
	navigation: any
	modalView?: boolean
}

function HelpPage({ navigation, modalView }: HelpPageProps) {
	// REDUX
	const dispatch = useAppDispatch()
  const buttonPressed = useAppSelector(selectButtonPressed).helpPageButtonPressed
	const currentWeek = useAppSelector(selectCurrentWeek)

	function buttonHandler() {
		if (modalView) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
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
							setTimeout(() => {
								navigation.navigate("CreateHabitLayout", {
									screen: "EnterHabitPage",
								})
							}, 100)
              setTimeout(() => {
                dispatch(setResetTrue())
              }, 2000)
						},
						style: "destructive",
					},
				]
			)
		} else {
			navigation.navigate("CreateHabitLayout", { screen: "EnterHabitPage" })
		}
	}

	return (
		<SafeAreaView style={styles.helpContainer}>
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

			<View>
				<Text style={styles.bodyText}>
					BreakIt is designed to help you hold yourself accountable when
					attempting to reduce or break your bad habits.
				</Text>

				<Text style={styles.bodyText}>
					You will enter a goal which determines your initial limit for acting
					on your bad habit.
				</Text>

				<Text style={styles.bodyText}>
					You can tap on your rock to view your current week's progress. Your
					goal will update each week. Here, you will see if you are on track to
					meet your goal.
				</Text>

				<Text style={styles.bodyText}>
					Each time you act on your habit, open up BreakIt and hit the plus!
					This will help you correlate an event with your bad habit, allowing
					you to be more mindful of your actions in the future.
				</Text>

				{!modalView && (
					<Text style={styles.bodyText}>
						Let's get started... swipe to continue!
					</Text>
				)}
			</View>

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
						contentStyle={styles.helpButtonContainer}
						style={
							buttonPressed
								? [styles.helpButtonPressed, { marginTop: 63 }]
								: [styles.helpButton, { marginTop: 60 }]
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
		</SafeAreaView>
	)
}

export default memo(HelpPage)
