import { memo, useContext } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import WhatNowModalContext from "../contexts/whatNowModalContext";

interface WhatNowPageProps {
    navigation: any; // Update the type to a more specific type if possible
    modalView?: boolean; // Update the type to a more specific type if possible
    closeModal?: any
}

function WhatNowPage({ navigation, modalView }: WhatNowPageProps) {

    const [whatNowModalVisible, setWhatNowModalVisible] = useContext(WhatNowModalContext)
    
    function closeWhatNowModal() {
        setWhatNowModalVisible(() => false)
    }

    function buttonHandler() {
        if(modalView) {
            closeWhatNowModal() 
            setTimeout(() => {
                navigation.navigate('CreateHabitLayout', { screen: 'EnterHabitPage' })
            }, 300);
        } else {
            navigation.navigate('TrackHabitLayout', { screen: 'ProgressPage' })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexHeader}>
                <Text style={styles.titleText}>What now?</Text>
                {modalView && 
                <Icon
                    onPress={closeWhatNowModal}
                    style={{marginRight: "7%"}}
                    name='times' 
                    size={30} 
                    color='white'
                />}
            </View>

            <View style={styles.body}>
                <Text style={styles.bodyText}>
                1. Each time you act on your habit, hit the + button.
                </Text>

                <Text style={styles.bodyText}>
                    2. Each week your rock will update! Cracks indicate progress. Tap your
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

            <Pressable style={modalView ? [styles.button, {borderColor: '#e34566'}] : styles.button} onPress={buttonHandler}>
                <Text style={modalView ? [styles.buttonText, {color: '#e34566'}] : styles.buttonText}>{modalView ? 'Break New Habit' : 'Begin'}</Text>
            </Pressable>
            
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
    titleText: {
        color: "white",
        fontSize: 29,
        fontWeight: "600",
        marginLeft: "7%",
        marginTop: "10%",
    },
    bodyText: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
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
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "400",
        color: "white"
    }
})