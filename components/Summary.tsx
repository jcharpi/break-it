import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import closeImage from "../images/blackClose.png"
export default function Summary() {
    return (
        <View style={styles.container}>
            <View style={styles.textHeader}>
                <Text style={[styles.titleText, styles.text]}>This Week</Text>
                <TouchableOpacity>
                    <Image source={closeImage} style={styles.closeImage} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.bodyText, styles.text]}>Goal: decrease by 10%</Text>
            <Text style={[styles.bodyText, styles.text]}>Current: decreased 4%</Text>
            <Text style={[styles.bodyText, styles.text]}>5 weeks remaining!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 220,
        borderRadius: 15, 
        backgroundColor: 'white'
    },
    closeImage: {
        width: 18,
        height: 18,
        marginRight: 15
    },
    textHeader: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        fontSize: 22,
        marginLeft: 15,
    },
    titleText: {
        fontWeight: "600",
        marginBottom: 5
    },
    bodyText: {
        fontSize: 22,
        fontWeight: "200",
        lineHeight: 50,
    }
})