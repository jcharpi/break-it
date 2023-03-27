import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import SliderMarker from "../components/SliderMarker";
export default function QuestionPage() {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>What now?</Text>
            <View style={styles.body}>
                <Slider 
                    minimumValue={0}
                    maximumValue={3}
                    trackMarks={[0, 1, 2, 3]}
                    step={1}
                    renderTrackMarkComponent={SliderMarker}
                />
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183",
    },
    titleText: {
        color: "white",
        fontSize: 29,
        fontWeight: "600",
        marginHorizontal: "10%",
        marginTop: "10%"
    },
    body: {
        marginHorizontal: "10%",
    },
})