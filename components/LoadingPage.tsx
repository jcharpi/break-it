// REACT COMPONENTS
import { View, ActivityIndicator } from "react-native"

// STYLE
import styles from "../styles"

export default function LoadingPage({}) {
	return (
		<View style={[styles.troveContainer, { justifyContent: "center" }]}>
			<ActivityIndicator animating={true} size="large" color={"white"} />
		</View>
	)
}
