import { View, StyleSheet, ScrollView } from "react-native";
import NavBar from "../components/NavBar";
import Achievement from "../components/Achievement";

export default function TrovePage({ navigation }: any) {

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
            <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} contentContainerStyle={styles.achievementList}>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
                <Achievement/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183"
    },
    backImage: {
        height: 25,
        width: 44
    },
    achievementList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
})