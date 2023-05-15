// REACT HOOKS & COMPONENTS
import { Dimensions } from "react-native"
import { useTheme } from "react-native-paper"
import { Provider } from "react-redux"
import EStyleSheet from "react-native-extended-stylesheet"

import BreakItLayout from "./layouts/BreakItLayout"

// REDUX
import { persistor, store } from "./app/store"
import { PersistGate } from "redux-persist/integration/react"

import AsyncStorage from "@react-native-async-storage/async-storage"

const height = Dimensions.get('window').height
const rem = height > 700 ? 24 : 19

EStyleSheet.build({
  $rem: rem
})

export default function App() {
	const theme = useTheme()
	theme.colors.secondaryContainer = "transparent"

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BreakItLayout />
			</PersistGate>
		</Provider>
	)
}
