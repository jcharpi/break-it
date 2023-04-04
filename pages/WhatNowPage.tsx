import { memo } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

interface WhatNowPageProps {
    navigation?: any; // Update the type to a more specific type if possible
    modalView?: boolean; // Update the type to a more specific type if possible
}
function WhatNowPage({ navigation, modalView }: WhatNowPageProps) {

    function beginHandler() {
        navigation.navigate('ProgressPage')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexHeader}>
                <Text style={styles.titleText}>What now?</Text>
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
                !modalView && 
                <Pressable style={styles.button} onPress={beginHandler}>
                    <Text style={styles.buttonText}>Begin</Text>
                </Pressable>
            }
        </SafeAreaView>
    )
}

export default memo(WhatNowPage)


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
        marginRight: 30,
    },
    titleText: {
        color: "white",
        fontSize: 29,
        fontWeight: "600",
        marginHorizontal: "7%",
        marginTop: "10%",
    },
    bodyText: {
        color: "white",
        fontSize: 20,
        fontWeight: "300",
        marginVertical: 25
    },
    body: {
        marginHorizontal: "7%",
    },
    button: {
        width: 200,
        height: 50,
        marginTop: 30,
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "300",
        color: "white"
    }
})