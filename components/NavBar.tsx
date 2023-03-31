import { StyleSheet, SafeAreaView, View, Text, Image, ImageSourcePropType, StyleProp, ImageStyle } from "react-native";

interface Props {
    title: string
    leftImage?: ImageSourcePropType
    leftImageStyle?: StyleProp<ImageStyle>
    rightImage?: ImageSourcePropType
    rightImageStyle?: StyleProp<ImageStyle>
}

export default function NavBar(props: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexView}>
                {
                    props.leftImage ? 
                    <Image 
                        source={props.leftImage} 
                        style={props.leftImageStyle} 
                        resizeMode="contain" 
                    /> 
                    : 
                    <View style={styles.noImage}></View>
                }
                <Text style={styles.title}>{props.title}</Text>

                {
                    props.rightImage ? 
                    <Image 
                        source={props.rightImage} 
                        style={props.rightImageStyle} 
                        resizeMode="contain" 
                    /> 
                    : 
                    <View style={styles.noImage}></View>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "12%",
        backgroundColor: '#424A67',
    },
    flexView: {
        marginTop: "auto",
        flexDirection: "row",
        flex: 1,
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
    noImage: {
        width: 44
    }
})