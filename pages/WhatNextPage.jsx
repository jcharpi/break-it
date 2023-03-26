import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AddButton from "../components/AddButton";
export default function WhatNextPage() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>What's Next?</Text>
            <Text>
                Each time you act on your habbbit, hit the 
                    <AddButton style={styles.button}/>
                button.
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183"
    },
    button: {
        height: 50,
        width: 50
    }
})