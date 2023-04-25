// REACT HOOKS & COMPONENTS
import { useState, memo, useEffect } from "react"
import { Slider } from "@miblanchard/react-native-slider"
import { SliderOnChangeCallback } from "@miblanchard/react-native-slider/lib/types"
import SliderMarker from "./SliderMarker"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setActiveSlider } from "../reducers/activeSliderSlice"
import { selectReset } from "../reducers/resetSlice"

// STYLE
import styles from "../styles"

interface SliderProps {
	maximumValue: number
	onValueChange: (value: number) => void
	onSlidingComplete?: SliderOnChangeCallback
	trackMarks: number[]
}

function CustomSlider(props: SliderProps) {
	const dispatch = useAppDispatch()
	const reset = useAppSelector(selectReset)

	const [sliderValue, setSliderValue] = useState(0)

	const handleValueChange: SliderOnChangeCallback = (value) => {
		setSliderValue(value[0])
		props.onValueChange(value[0])
	}

	useEffect(() => {
		if (reset) {
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
			onSlidingStart={() => dispatch(setActiveSlider())}
			onSlidingComplete={props.onSlidingComplete}
		/>
	)
}

export default memo(CustomSlider)
