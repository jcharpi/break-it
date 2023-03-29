import { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import whiteCloseImage from "../images/whiteClose.png"
export default function WhatNowPage() {

    const [firstHabit, setFirstHabit] = useState(true)

    function beginHandler() {
        setFirstHabit(() => false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexHeader}>
                <Text style={styles.titleText}>What now?</Text>
                {
                    !firstHabit && 

                    <TouchableOpacity>
                        <Image style={styles.closeImage} source={whiteCloseImage} />
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.body}>
                <Text style={styles.bodyText}>
                1. Each time you act on your habit, hit the + button.
                </Text>

                <Text style={styles.bodyText}>
                    2. Each week, your rock will update! Cracks indicate progress. Tap your
                    rock to see your week’s current progress.
                </Text>

                <Text style={styles.bodyText}>
                    3. After you have successfully broken your habit, you will get a gem as a 
                    reward, which can be viewed in your treasure trove!
                </Text>

                <Text style={styles.bodyText}>
                    4. Show off your trove and enter a new habit!
                </Text>
            </View>


            {
                firstHabit && 

                <TouchableOpacity style={styles.button} onPress={beginHandler}>
                    <Text style={styles.buttonText}>Begin</Text>
                </TouchableOpacity>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183",
    },
    flexHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    closeImage: {
        height: 22,
        width: 22,
        marginRight: 40,
        marginBottom: 20
    },
    titleText: {
        color: "white",
        fontSize: 29,
        fontWeight: "600",
        marginHorizontal: "7%",
        marginTop: "10%"
    },
    bodyText: {
        color: "white",
        fontSize: 20,
        fontWeight: 300,
        marginVertical: 25
    },
    body: {
        marginHorizontal: "7%",
    },
    button: {
        width: 200,
        height: 50,
        marginTop: 50,
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 300,
        color: "white"
    }
})