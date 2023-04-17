// REACT HOOKS & COMPONENTS
import { StyleSheet, SafeAreaView, View, Text, Platform, StatusBar, Pressable } from "react-native";
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
                    <Pressable onPress={props.handleLeftIcon ?? handleNothing}
                    >
                        <Icon
                            style={styles.icon}
                            name={props.leftIconName} 
                            size={30} 
                            color='white'
                        />
                    </Pressable>
                    
                    : 
                    <View style={styles.noImage}></View>
                }

                <Text style={styles.title}>{props.title}</Text>

                {
                    props.rightIconName ? 
                    <Pressable onPress={props.handleRightIcon ?? handleNothing}
                    >
                        <Icon
                            style={styles.icon}
                            name={props.rightIconName} 
                            size={30} 
                            color='white'
                        />
                    </Pressable>
                    : 
                    <View style={styles.noImage}></View> // Ensures center spacing of title on navbar
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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
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