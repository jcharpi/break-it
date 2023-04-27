// REACT HOOKS & COMPONENTS
import { useTheme } from "react-native-paper"
import { Provider } from "react-redux"
import BreakItLayout from "./layouts/BreakItLayout"

// REDUX
import { persistor, store } from "./app/store"
import { PersistGate } from "redux-persist/integration/react"

import AsyncStorage from "@react-native-async-storage/async-storage"
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
