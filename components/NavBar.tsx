import { StyleSheet, SafeAreaView, View, Text, Image, ImageSourcePropType } from "react-native";

interface Props {
    title: string
    leftImage?: ImageSourcePropType
    rightImage?: ImageSourcePropType
}

export default function NavBar(props: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexView}>
                {props.leftImage && <Image source={props.leftImage} style={styles.helpImage} resizeMode="contain" />}
                <Text style={styles.title}>{props.title}</Text>
                {props.rightImage && <Image source={props.rightImage} style={styles.troveImage} resizeMode="contain" />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "11%",
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
        flex: 1,
        textAlign: "center"
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