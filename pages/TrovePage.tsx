// REACT COMPONENTS & HOOKS
import { View, ScrollView, Text } from "react-native"

// CUSTOM COMPONENTS
import Achievement from "../components/Achievement"
import NavBar from "../components/NavBar"

// REDUX
import { useAppSelector } from "../app/hooks"
import { selectAchievements } from "../reducers/achievementSlice"

// STYLE
import styles from "../styles"

interface Achievement {
	gem: "silver" | "gold" | "diamond"
	habitName: string
}

export default function TrovePage({ navigation }: any) {
	const achievements = useAppSelector(selectAchievements)

	function handleBack() {
		navigation.navigate("ProgressPage")
	}

	return (
		<View style={styles.troveContainer}>
			<NavBar
				handleLeftIcon={handleBack}
				leftIconName={"chevron-left"}
				title="Trove"
			/>
			{achievements.length === 0 && (
				<Text style={styles.troveBody}>No treasure here yet!</Text>
			)}

			<ScrollView
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={false}
				contentContainerStyle={styles.troveAchievementList}
			>
				{achievements.map((achievement: Achievement, index: number) => {
					return (
						<Achievement
							key={achievement.habitName + index}
							gem={achievement.gem}
							habitName={achievement.habitName}
						/>
					)
				})}
			</ScrollView>
		</View>
	)
}
