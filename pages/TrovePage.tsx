// REACT COMPONENTS & HOOKS
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useContext } from "react";

// CUSTOM COMPONENTS
import Achievement from "../components/Achievement";
import NavBar from "../components/NavBar";

// CONTEXTS
import AchievementContext from "../contexts/AchievementContext";

export default function TrovePage({ navigation }: any) {
    const [achievements, setAchievements] = useContext(AchievementContext)

    function handleBack() {
        navigation.navigate('ProgressPage')
    }

    return (
        <View style={styles.container}>
            <NavBar 
                handleLeftIcon={handleBack}
                leftIconName={'chevron-left'} 
                title="Trove"
            />
            {achievements.length === 0 && <Text style={styles.bodyText}>No treasure here yet!</Text>}

            <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} contentContainerStyle={styles.achievementList}>
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

const styles = StyleSheet.create({
    achievementList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    backImage: {
        height: 25,
        width: 44
    },
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183"
    },
    bodyText: {
        color: "white",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "600",
        marginVertical: 25
    },
})