import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import NavBar from "../components/NavBar";

export default function TrovePage() {
    return (
        <View style={styles.container}>
            <NavBar title="Trove"/>
            <Text>Free</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183"
    },
})