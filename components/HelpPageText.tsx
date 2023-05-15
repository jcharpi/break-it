// REACT
import React from "react"
import { Text, View } from "react-native"

// STYLES
import styles from "../styles"

interface Props {
	modalView?: boolean
}
export function HelpPageText(props: Props) {
	return (
		<View>
			<Text style={[styles.bodyText, styles.helpMargin]}>
				BreakIt is designed to help you hold yourself accountable when
				attempting to reduce or break your bad habits.
			</Text>

			<Text style={[styles.bodyText, styles.helpMargin]}>
				You will enter a goal which determines your initial limit for acting on
				your bad habit.
			</Text>

			<Text style={[styles.bodyText, styles.helpMargin]}>
				You can tap on your rock to view your current week's progress. Your goal
				will update each week. Here, you will see if you are on track to meet
				your goal.
			</Text>

			<Text style={[styles.bodyText, styles.helpMargin]}>
				Each time you act on your habit, open up BreakIt and hit the plus! This
				will help you correlate an event with your bad habit, allowing you to be
				more mindful of your actions in the future.
			</Text>

			{!props.modalView && (
				<Text style={styles.bodyText}>
					Let's get started... swipe to continue!
				</Text>
			)}
		</View>
	)
}
