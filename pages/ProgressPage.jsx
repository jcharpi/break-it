import NavBar from "../components/NavBar"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import rockImage from "../images/rock.png"
import addImage from "../images/add.png"
export default function ProgressPage() {
    return (
        <View style={styles.container}>
            <NavBar/>
            <View style={styles.flexView}>
                <Image source={rockImage}/>
                <TouchableOpacity style={styles.addButton}>
                    <Image source={addImage} style={styles.addImage} />
                </TouchableOpacity>
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
    addButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFD645',
    },
    addImage: {
        width: 33,
        height: 33,
    },
})