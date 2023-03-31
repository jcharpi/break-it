import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import NavBar from "../components/NavBar";
import backImage from "../images/back.png"

export default function TrovePage() {
    return (
        <View style={styles.container}>
            <NavBar 
                leftImage={backImage} 
                leftImageStyle={styles.backImage}
                title="Trove"/>
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
    backImage: {
        height: 30,
        width: 44
    }
})