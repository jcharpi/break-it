// REACT HOOKS, COMPONENTS, & LIBRARIES
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'

// CONTEXTS
import SummaryModalVisibleContext from "../contexts/SummaryModalVisibleContext";


export default function Summary() {

    const [summaryModalVisible, setSummaryModalVisible] = useContext(SummaryModalVisibleContext)

    function closeSummaryModal() {
        setSummaryModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.textHeader}>
                <Text style={[styles.titleText, styles.text]}>This Week</Text>
                <Icon
                    onPress={closeSummaryModal}
                    style={{marginRight: "4%"}}
                    name='times' 
                    size={25} 
                    color='black'
                />
            </View>
            <Text style={[styles.bodyText, styles.text]}>Goal: decrease by 10%</Text>
            <Text style={[styles.bodyText, styles.text]}>Current: decreased 4%</Text>
            <Text style={[styles.bodyText, styles.text]}>5 weeks remaining!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bodyText: {
        fontSize: 22,
        fontWeight: "400",
        lineHeight: 45,
    },
    container: {
        width: '90%',
        height: 190,
        borderRadius: 15, 
        backgroundColor: 'white'
    },
    text: {
        fontSize: 22,
        marginLeft: "4%",
    },
    textHeader: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    titleText: {
        fontWeight: "600",
        marginBottom: 5
    },
})