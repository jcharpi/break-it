import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
import helpImage from "../images/help.png"
import troveImage from "../images/trove.png"

export default function NavBar() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexView}>
                <Image source={helpImage} style={styles.helpImage} resizeMode="contain" />
                <Text style={styles.title}>Progress</Text>
                <Image source={troveImage} style={styles.troveImage} resizeMode="contain" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        backgroundColor: '#424A67',
        
    },
    flexView: {
        marginTop: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 8,
    },
    title: {
        color: "white",
        fontWeight: "600",
        fontSize: 22,
    },
    helpImage: {
        width: 44,
        height: 30
    },
    troveImage: {
        width: 44,
        height: 44
    }
})