// REACT
import React from "react"
import { ScrollView, Text } from "react-native"
import { Frequency, Impact, Occurrences } from "../pages/QuestionPage"

// CUSTOM COMPONENTS
import CustomSlider from "./CustomSlider"

// STYLES
import styles from "../styles"

interface Props {
	firstOccurrence: Occurrences
	changeOccurrence: (value: number) => void
	frequency: Frequency
	changeFrequency: (value: number) => void
	impact: Impact
	changeImpact: (value: number) => void
	goal: number
	setGoal: React.Dispatch<React.SetStateAction<number>>
	slidersComplete: (value: number) => void
}
export function SliderBody(props: Props) {
	return (
		<ScrollView
			style={{ flex: 1 }}
			alwaysBounceVertical={false}
			centerContent={true}
		>
			<Text style={styles.bodyText}>
				First occurrence was{" "}
				<Text style={styles.questionValue}>{props.firstOccurrence}</Text> ago
			</Text>
			<CustomSlider
				onValueChange={props.changeOccurrence}
				maximumValue={2}
				trackMarks={[0, 1, 2]}
			/>

			<Text style={styles.bodyText}>
				I engage in this habit{" "}
				<Text style={styles.questionValue}>{props.frequency}</Text>
			</Text>
			<CustomSlider
				onValueChange={props.changeFrequency}
				maximumValue={2}
				trackMarks={[0, 1, 2]}
			/>

			<Text style={styles.bodyText}>
				This habit has a{" "}
				<Text style={styles.questionValue}>{props.impact}</Text> impact
			</Text>
			<CustomSlider
				onValueChange={props.changeImpact}
				maximumValue={2}
				trackMarks={[0, 1, 2]}
			/>

			<Text style={styles.bodyText}>
				My first goal is <Text style={styles.questionValue}>{props.goal}</Text>{" "}
				times a week
			</Text>

			<CustomSlider
				onValueChange={props.setGoal}
				maximumValue={100}
				trackMarks={[0, 100]}
				onSlidingComplete={props.slidersComplete}
			/>
		</ScrollView>
	)
}
