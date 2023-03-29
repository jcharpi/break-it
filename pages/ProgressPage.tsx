import NavBar from "../components/NavBar"
import { Image, StyleSheet, View } from "react-native"
import rockImage from "../images/rock.png"
import AddButton from "../components/AddButton"

export default function ProgressPage() {
    return (
        <View style={styles.container}>
            <NavBar/>
            <View style={styles.flexView}>
                <Image source={rockImage}/>
                <AddButton/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183"
    },
    flexView: {
        marginTop: "40%",
        flexDirection: "column",
        alignItems:"center",
        gap: 60
    },
})