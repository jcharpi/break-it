import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import SliderMarker from "../components/SliderMarker";
import CustomSlider from "../components/CustomSlider";
export default function QuestionPage() {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>What now?</Text>
            <View style={styles.body}>
                <CustomSlider maximumValue={3} trackMarks={[0, 1, 2, 3]}/>
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
})