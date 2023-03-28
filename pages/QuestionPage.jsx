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
                    minimumTrackStyle={styles.minimumTrackStyle}
                    minimumTrackTintColor="white"
                    renderTrackMarkComponent={SliderMarker}
                    thumbStyle={styles.thumbStyle}
                    trackStyle={styles.trackStyle}
                    containerStyle={styles.containerStyle}
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
    containerStyle: {
        marginHorizontal: 10,
        borderRadius: 15,
    },
    thumbStyle: {
        backgroundColor: "#989DB0",
        borderRadius: 15,
        height: 30,
        width: 30,
    },
    trackStyle: {
        height: 32,
        borderRadius: 30,
        backgroundColor: "white",
    },
    minimumTrackStyle: {
        height: 0
    }
})