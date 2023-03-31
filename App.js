import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Summary from './components/Summary';
import EnterHabitPage from './pages/EnterHabitPage';
import ProgressPage from './pages/ProgressPage';
import QuestionPage from './pages/QuestionPage';
import TrovePage from './pages/TrovePage';
import WhatNowPage from './pages/WhatNowPage';
export default function App() {
  return (
    <View style={styles.container}>
      <TrovePage/>
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

