import { useState, memo, useEffect, useContext } from "react"
import { StyleSheet } from "react-native"
import { Slider } from "@miblanchard/react-native-slider"
import { SliderOnChangeCallback } from "@miblanchard/react-native-slider/lib/types"

import SliderMarker from "./SliderMarker"

import ResetContext from "../contexts/ResetContext"

interface SliderProps {
    maximumValue: number,
    onValueChange: any,
    onSlidingComplete?: any
    trackMarks: number[],
}

function CustomSlider(props: SliderProps) {
    const [reset, setReset] = useContext(ResetContext)
    const [sliderValue, setSliderValue] = useState(0)

    const handleValueChange: SliderOnChangeCallback = (value) => {
        setSliderValue(value[0])
        props.onValueChange(value[0])
    }

    useEffect(() => {
        if(reset) {
            setSliderValue(0)
        }
    }, [reset])

    return (
        <Slider 
            minimumValue={0}
            maximumValue={props.maximumValue}
            trackMarks={props.trackMarks}
            step={1}
            minimumTrackStyle={styles.minimumTrackStyle}
            minimumTrackTintColor="white"
            renderTrackMarkComponent={SliderMarker}
            onValueChange={handleValueChange}
            value={sliderValue}
            thumbStyle={styles.thumbStyle}
            trackStyle={styles.trackStyle}
            containerStyle={styles.containerStyle}
            onSlidingComplete={props.onSlidingComplete ?? (() => {})}
        />
    )
}

export default memo(CustomSlider)


const styles = StyleSheet.create({
    containerStyle: {
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 15,
    },
    minimumTrackStyle: {
        height: 0
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
})