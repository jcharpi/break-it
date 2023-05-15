// REACT
import React from "react"
import { Modal, Pressable } from "react-native"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectModalVisible, setSummaryModalInvisible } from "../reducers/modalVisibleSlice"

// COMPONENTS
import Summary from "./Summary"

// STYLES
import styles from "../styles"

interface Props {
  goal: number
}

export function SummaryModal(props: Props) {
  const dispatch = useAppDispatch()
  const modalVisible = useAppSelector(selectModalVisible).summaryModalVisible

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => dispatch(setSummaryModalInvisible())}
			presentationStyle="overFullScreen"
		>
			<Pressable
				onPress={() => dispatch(setSummaryModalInvisible())}
				style={styles.progressModalContainer}
			>
				<Summary goal={props.goal} />
			</Pressable>
		</Modal>
	)
}
