// REACT HOOKS & COMPONENTS
import { useTheme } from "react-native-paper"
import { Provider } from "react-redux"

// REDUX
import { persistor, store } from "./app/store"
import BreakItLayout from "./layouts/BreakItLayout"
import { PersistGate } from "redux-persist/integration/react"


export default function App() {
  const theme = useTheme()
  theme.colors.secondaryContainer = "transparent"  

  return (
    <Provider store={store}>
      <BreakItLayout/>
    </Provider>

    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <BreakItLayout/>
    //   </PersistGate>
    // </Provider>
  )
}


