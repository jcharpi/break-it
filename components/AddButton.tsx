import { Image, StyleSheet, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import addImage from "../images/add.png"

export default function AddButton() {
    return (
        <Pressable style={styles.addButton}>
            <Icon
                name='plus' 
                size={33} 
                color='#FFD645'
            />
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
})