import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import SummaryModalContext from "../contexts/summaryModalContext";
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Summary() {

    const [summaryModalVisible, setSummaryModalVisible] = useContext(SummaryModalContext);

    function closeSummaryModal() {
        setSummaryModalVisible(() => false)
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
    container: {
        width: '90%',
        height: 220,
        borderRadius: 15, 
        backgroundColor: 'white'
    },
    textHeader: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    text: {
        fontSize: 22,
        marginLeft: "4%",
    },
    titleText: {
        fontWeight: "600",
        marginBottom: 5
    },
    bodyText: {
        fontSize: 22,
        fontWeight: "400",
        lineHeight: 50,
    }
})