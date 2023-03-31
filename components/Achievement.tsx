import { Image, StyleSheet, Text, View } from "react-native";
import gemImage from "../images/gem.png"
import { memo } from "react";

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
    gemImage: {
        width: 100,
        height: 100,
    },
    bodyText: {
        color: "white",
        fontSize: 17,
        fontWeight: "600",
        marginTop: 20
    },
})