// REACT HOOKS & COMPONENTS
import { memo } from "react"
import { Image, Text, View } from "react-native"
import { Gem } from "../reducers/habitSlice"

// CUSTOM IMAGES
import silver from "../images/silver.png"
import gold from "../images/gold.png"
import diamond from "../images/diamond.png"

// STYLE
import styles from "../styles"

interface Props {
	gem: Gem
	habitName: string
}

function Achievement(props: Props) {
	function getGemImage() {
		switch (props.gem) {
			case Gem.SILVER:
				return silver
			case Gem.GOLD:
				return gold
			case Gem.DIAMOND:
				return diamond
			default:
				return silver
		}
	}

	return (
		<View style={styles.achievementContainer}>
			<Image
				source={getGemImage()}
				style={styles.gemImage}
				resizeMode="contain"
			/>
			<Text style={styles.achievementBody}>{props.habitName}</Text>
		</View>
	)
}

export default memo(Achievement)
