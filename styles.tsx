import { StyleSheet } from "react-native";
import { Platform, StatusBar } from "react-native";

export default StyleSheet.create({
    // ACHIEVEMENT
    achievementContainer: {
        margin: 35,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    achievementBody: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 10
    },
    gemImage: {
        width: 110,
        height: 110,
    },

    // ADD BUTTON
    addButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#FFD645",
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.5,
    },
    addButtonPressed: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#FFD645",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        marginTop: 3,
        marginLeft: 1,
    },

    // CUSTOM SLIDER
    sliderContainer: {
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 15,
    },
    minimumTrackStyle: {
        height: 0
    },
    thumbStyle: {
        backgroundColor: "#989DB0",
        borderRadius: 15,
        height: 30,
        width: 30,
    },
    trackStyle: {
        height: 32,
        borderRadius: 30,
        backgroundColor: "white",
        marginHorizontal: -1
    },

    // NAVBAR
    navContainer: {
        width: "100%",
        height: "12%",
        backgroundColor: "#424A67",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    navFlex: {
        marginTop: "auto",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 8,
    },
    navIcon: {
        width: 40,
    },
    navNoImage: {
        width: 40
    },
    navTitle: {
        color: "white",
        fontWeight: "600",
        fontSize: 22,  
    },

    // SLIDER MARKER
    markerContainer: {
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: "#DDE2F5",
        marginLeft: 7
    },

    // SUMMARY
    summaryTitle: {
        fontWeight: "600",
        marginBottom: 5
    },
    summaryBody: {
        fontSize: 22,
        fontWeight: "400",
        lineHeight: 45,
    },
    summaryText: {
        fontSize: 22,
        marginLeft: "4%",
    },
    summaryContainer: {
        width: "90%",
        height: 190,
        borderRadius: 15, 
        backgroundColor: "white"
    },
    summaryHeader: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },

})
