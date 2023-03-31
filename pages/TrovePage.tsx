import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import NavBar from "../components/NavBar";
import backImage from "../images/back.png"
import Achievement from "../components/Achievement";

export default function TrovePage() {
    return (
        <View style={styles.container}>
            <NavBar 
                leftImage={backImage} 
                leftImageStyle={styles.backImage}
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
        height: 30,
        width: 44
    },
    achievementList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
})