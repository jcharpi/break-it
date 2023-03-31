import NavBar from "../components/NavBar"
import { Image, StyleSheet, View } from "react-native"
import rockImage from "../images/rock.png"
import AddButton from "../components/AddButton"
import helpImage from "../images/help.png"
import troveImage from "../images/trove.png"

export default function ProgressPage() {
    return (
        <View style={styles.container}>
            <NavBar 
                leftImage={helpImage} 
                leftImageStyle={styles.helpImage} 
                rightImage={troveImage} 
                rightImageStyle={styles.troveImage} 
                title="Progress"
            />
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
    helpImage: {
        width: 44,
        height: 30
    },
    troveImage: {
        width: 44,
        height: 44
    }
})