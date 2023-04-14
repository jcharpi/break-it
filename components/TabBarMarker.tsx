// REACT COMPONENTS
import { StyleSheet, View } from "react-native";

// Circle breakpoints for sliders
export default function TabBarMarker() {
    return (
        <View style={styles.marker}></View>
    )
}

const styles = StyleSheet.create({
    marker: {
        height: 20,
        width: 20,
        color: '#DDE2F5',
        borderRadius: 10
    }
})