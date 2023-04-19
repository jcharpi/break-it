// REACT HOOKS & COMPONENTS
import { useState, memo, useEffect, useContext } from "react"
import { Slider } from "@miblanchard/react-native-slider"
import { SliderOnChangeCallback } from "@miblanchard/react-native-slider/lib/types"
import SliderMarker from "./SliderMarker"

// CONTEXTS
import ActiveSliderContext from "../contexts/ActiveSliderContext"
import ResetContext from "../contexts/ResetContext"

// STYLE
import styles from "../styles"

interface SliderProps {
    maximumValue: number,
    onValueChange: any,
    onSlidingComplete?: any
    trackMarks: number[],
}

function CustomSlider(props: SliderProps) {
    const [activeSlider, setActiveSlider] = useContext(ActiveSliderContext)
    const [reset, setReset] = useContext(ResetContext)
    const [sliderValue, setSliderValue] = useState(0)

    const handleValueChange: SliderOnChangeCallback = (value) => {
        setSliderValue(value[0])
        props.onValueChange(value[0])
    }

    function sliderComplete () {
        if(props.onSlidingComplete === null) {
            setActiveSlider(false)
        } else {
            props.onSlidingComplete()
            setActiveSlider(false)
        }
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
            containerStyle={styles.sliderContainer}
            onSlidingStart={() => setActiveSlider(true)}
            onSlidingComplete={sliderComplete}
        />
    )
}

export default memo(CustomSlider)