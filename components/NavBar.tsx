import { StyleSheet, SafeAreaView, View, Text } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome5'

interface Props {
    title: string
    leftIconName?: string
    handleLeftIcon?: () => void
    rightIconName?: string
    handleRightIcon?: () => void
}

export default function NavBar(props: Props) {

    function handleNothing() {}

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexView}>
                {
                    props.leftIconName ? 
                    <Icon
                        style={styles.icon}
                        onPress={props.handleLeftIcon ?? handleNothing}
                        name={props.leftIconName} 
                        size={30} 
                        color='white'
                    />
                    : 
                    <View style={styles.noImage}></View>
                }

                <Text style={styles.title}>{props.title}</Text>

                {
                    props.rightIconName ? 
                    <Icon
                        style={styles.icon}
                        onPress={props.handleRightIcon ?? handleNothing}
                        name={props.rightIconName} 
                        size={30} 
                        color='white'
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
    icon: {
        width: 40,
    },
    noImage: {
        width: 40
    },
    title: {
        color: "white",
        fontWeight: "600",
        fontSize: 22,  
    },
})