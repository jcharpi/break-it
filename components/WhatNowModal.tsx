// REACT
import React from "react"
import { Modal } from "react-native"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectModalVisible, setHelpModalInvisible } from "../reducers/modalVisibleSlice"

// PAGES
import HelpPage from "../pages/HelpPage"

interface Props {
  navigation: any
}

export function WhatNowModal(props: Props) {
  const dispatch = useAppDispatch()
  const modalVisible = useAppSelector(selectModalVisible).helpModalVisible

	return (
		<Modal
			animationType="slide"
			visible={modalVisible}
			onRequestClose={() => dispatch(setHelpModalInvisible())}
			presentationStyle="pageSheet"
			statusBarTranslucent={true}
		>
			<HelpPage navigation={props.navigation} modalView={true} />
		</Modal>
	)
}
