import { Image, StyleSheet, Pressable } from "react-native";
import addImage from "../images/add.png"

export default function AddButton() {
    return (
        <Pressable style={styles.addButton}>
            <Image source={addImage} style={styles.addImage} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
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