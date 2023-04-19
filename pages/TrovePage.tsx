// REACT COMPONENTS & HOOKS
import { View, ScrollView, Text } from "react-native"
import { useContext } from "react"

// CUSTOM COMPONENTS
import Achievement from "../components/Achievement"
import NavBar from "../components/NavBar"

// CONTEXTS
import AchievementContext from "../contexts/AchievementContext"

// STYLE
import styles from "../styles"

export default function TrovePage({ navigation }: any) {
    const [achievements, setAchievements] = useContext(AchievementContext)

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
            {achievements.length === 0 && <Text style={styles.troveBody}>No treasure here yet!</Text>}

            <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} contentContainerStyle={styles.troveAchievementList}>
                {achievements.map((achievement: any, index: number) => {
                    return (
                        <Achievement 
                            key={achievement.habitName + index}
                            habitName={achievement.habitName}
                            gem={achievement.gem}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}