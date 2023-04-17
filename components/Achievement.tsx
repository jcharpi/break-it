// REACT HOOKS & COMPONENTS
import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// CUSTOM IMAGES
import gemImage from "../images/gem.png";
import silver from "../images/silver.png";
import gold from "../images/gold.png";
import diamond from "../images/diamond.png";

interface Props {
    gem: string
    habitName: string
}

function Achievement(props: Props) {

    function getGemImage() {
        switch (props.gem) {
            case "silver":
                return silver;
            case "gold":
                return gold;
            case "diamond":
                return diamond;
            default:
                return silver;
        }
    }

    return (
        <View style={styles.container}>
            <Image 
                source={getGemImage()} 
                style={styles.gemImage} 
                resizeMode="contain" 
            />
            <Text style={styles.bodyText}>{props.habitName}</Text>
        </View>
    )
}

export default memo(Achievement)


const styles = StyleSheet.create({
    container: {
        margin: 35,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    bodyText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 10
    },
    gemImage: {
        width: 110,
        height: 110,
    },
})