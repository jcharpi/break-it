// REACT HOOKS & COMPONENTS
import { SafeAreaView, View, Text, Pressable } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// STYLE
import styles from "../styles"

interface Props {
	title: string
	leftIconName?: string
	handleLeftIcon?: () => void
	rightIconName?: string
	handleRightIcon?: () => void
}

export default function NavBar(props: Props) {
	function handleNothing() {}

	return (
		<SafeAreaView style={styles.navContainer}>
			<View style={styles.navFlex}>
				{props.leftIconName ? (
					<Pressable onPress={props.handleLeftIcon ?? handleNothing}>
						<Icon
							style={styles.navIcon}
							name={props.leftIconName}
							size={37}
							color="white"
						/>
					</Pressable>
				) : (
					<View style={styles.navNoImage}></View>
				)}

				<Text style={styles.navTitle}>{props.title}</Text>

				{
					props.rightIconName ? (
						<Pressable onPress={props.handleRightIcon ?? handleNothing}>
							<Icon
								style={styles.navIcon}
								name={props.rightIconName}
								size={37}
								color="white"
							/>
						</Pressable>
					) : (
						<View style={styles.navNoImage}></View> // Ensures center spacing of title on navbar
					)
				}
			</View>
		</SafeAreaView>
	)
}
