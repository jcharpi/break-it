// REACT HOOKS & COMPONENTS
import { useTheme } from "react-native-paper"
import { Provider } from "react-redux"

// REDUX
import { store } from "./app/store"
import BreakItLayout from "./layouts/BreakItLayout"


export default function App() {
  const theme = useTheme()
  theme.colors.secondaryContainer = "transparent"  

  return (
    <Provider store={store}>
      <BreakItLayout/>
    </Provider>
  )
}


