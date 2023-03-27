import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ProgressPage from './pages/ProgressPage';
import QuestionPage from './pages/QuestionPage';
export default function App() {
  return (
    <View style={styles.container}>
      <QuestionPage/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    marginBottom: "auto"
  }
});

