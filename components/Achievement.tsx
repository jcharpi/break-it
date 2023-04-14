// REACT HOOKS & COMPONENTS
import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// CUSTOM IMAGES
import gemImage from "../images/gem.png"

function Achievement() {
    return (
        <View style={styles.container}>
            <Image 
                source={gemImage} 
                style={styles.gemImage} 
                resizeMode="contain" 
            />
            <Text style={styles.bodyText}>Bad Habit Name</Text>
        </View>
    )
}

export default memo(Achievement)


const styles = StyleSheet.create({
    container: {
        margin: 30,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    bodyText: {
        color: "white",
        fontSize: 17,
        fontWeight: "600",
        marginTop: 20
    },
    gemImage: {
        width: 100,
        height: 100,
    },
})