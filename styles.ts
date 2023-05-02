import { StyleSheet } from "react-native"
import { Platform, StatusBar } from "react-native"

export default StyleSheet.create({
	// UNIVERSAL
	bodyText: {
		color: "white",
		fontSize: 19,
		fontWeight: "500",
		marginHorizontal: "7%",
		marginTop: "11%",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
	},
	titleText: {
		color: "white",
		fontSize: 29,
		fontWeight: "600",
		marginHorizontal: "7%",
		marginTop: "10%",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
	},

	// ACHIEVEMENT
	achievementBody: {
		color: "white",
		fontSize: 20,
		fontWeight: "600",
		marginVertical: 10,
	},
	achievementContainer: {
		margin: 35,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	gemImage: {
		width: 110,
		height: 110,
	},

	// ADD BUTTON
	addButtonShared: {
		alignItems: "center",
		backgroundColor: "white",
		borderColor: "#FFC333",
		borderWidth: 3,
		borderRadius: 50,
		height: 100,
		justifyContent: "center",
		width: 100,
	},
	addButton: {
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
	},
	addButtonPressed: {
		marginTop: 3,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 3,
	},

	// CUSTOM SLIDER
	minimumTrackStyle: {
		height: 0,
	},
	sliderContainer: {
		borderRadius: 15,
		marginHorizontal: 20,
		marginTop: 10,
	},
	thumbStyle: {
		backgroundColor: "#989DB0",
		borderRadius: 15,
		height: 30,
		width: 30,
	},
	trackStyle: {
		backgroundColor: "white",
		borderRadius: 30,
		height: 32,
		marginHorizontal: -1,
	},

	// NAVBAR
	navContainer: {
		backgroundColor: "#424A67",
		height: "12%",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		width: "100%",
	},
	navFlex: {
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		marginHorizontal: 20,
		marginBottom: 8,
		marginTop: "auto",
	},
	navIcon: {
		width: 40,
	},
	navNoImage: {
		width: 40,
	},
	navTitle: {
		color: "white",
		fontSize: 22,
		fontWeight: "600",
	},

	// SLIDER MARKER
	markerContainer: {
		backgroundColor: "#DDE2F5",
		borderRadius: 15,
		height: 15,
		marginLeft: 7,
		width: 15,
	},

	// SUMMARY
	summaryBody: {
		fontSize: 22,
		fontWeight: "400",
		lineHeight: 45,
	},
	summaryContainer: {
		backgroundColor: "white",
		borderRadius: 15,
		height: 190,
		width: "90%",
	},
	summaryHeader: {
		alignItems: "flex-start",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 15,
	},
	summaryText: {
		fontSize: 22,
		marginLeft: "4%",
	},
	summaryTitle: {
		fontWeight: "600",
		marginBottom: 5,
	},

	// ENTER HABIT PAGE
	enterContainer: {
		alignItems: "center",
		backgroundColor: "#586183",
		flexDirection: "column",
		flex: 1,
		justifyContent: "center",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		width: "100%",
	},
	enterTextInput: {
		backgroundColor: "white",
		borderRadius: 15,
		borderWidth: 2,
		fontSize: 19,
		height: 45,
		marginVertical: "4%",
		marginBottom: 100,
		paddingLeft: 10,
		width: "80%",
	},

	// QUESTION PAGE
	questionContainer: {
		backgroundColor: "#586183",
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		width: "100%",
	},
	questionValue: {
		fontWeight: "700",
	},

	// HELP PAGE
	helpButton: {
		alignSelf: "center",
		borderRadius: 15,
		justifyContent: "center",
		marginTop: 67,
	},
	helpButtonContainer: {
		height: 45,
		width: 250,
	},
	helpButtonPressed: {
		alignSelf: "center",
		borderRadius: 15,
		justifyContent: "center",
		marginTop: 70,
	},
	helpButtonText: {
		fontSize: 20,
		fontWeight: "600",
	},
	helpContainer: {
		backgroundColor: "#586183",
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		width: "100%",
	},
	helpFlexHeader: {
		alignItems: "flex-end",
		flexDirection: "row",
		justifyContent: "space-between",
	},

	// PROGRESS PAGE
	progressContainer: {
		backgroundColor: "#586183",
		flex: 1,
		width: "100%",
	},
	progressFlexView: {
		alignItems: "center",
		flexDirection: "column",
		gap: 60,
		marginTop: "30%",
	},
	progressModalContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	progressRock: {
		height: 350,
		width: 350,
	},
  gemRock: {
    marginVertical: 75,
    width: 170,
		height: 200,
  },

	// TROVE PAGE
	troveAchievementList: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	troveBody: {
		color: "white",
		fontSize: 22,
		fontWeight: "600",
		marginVertical: 25,
		textAlign: "center",
	},
	troveContainer: {
		backgroundColor: "#586183",
		flex: 1,
		width: "100%",
	},

	// CREATE HABIT LAYOUT
	createTabBar: {
		backgroundColor: "#586183",
		paddingBottom: "10%",
	},
	createTabBarContainer: {
		justifyContent: "center",
	},
	createTabBarItem: {
		width: 50,
	},
})
