import { StyleSheet, View } from "react-native";

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