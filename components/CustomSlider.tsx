import { StyleSheet } from "react-native"
import { Slider } from "@miblanchard/react-native-slider"
import SliderMarker from "./SliderMarker"

interface sliderProps {
    maximumValue: number,
    trackMarks: number[]
}

export default function CustomSlider(props: sliderProps) {
    return (
        <Slider 
            minimumValue={0}
            maximumValue={props.maximumValue}
            trackMarks={props.trackMarks}
            step={1}
            minimumTrackStyle={styles.minimumTrackStyle}
            minimumTrackTintColor="white"
            renderTrackMarkComponent={SliderMarker}
            thumbStyle={styles.thumbStyle}
            trackStyle={styles.trackStyle}
            containerStyle={styles.containerStyle}
        />
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        marginHorizontal: 30,
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
        marginHorizontal: -1
    },
    minimumTrackStyle: {
        height: 0
    }
})