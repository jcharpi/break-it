import { Dimensions, Platform, StatusBar } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default EStyleSheet.create({
	// UNIVERSAL
	bodyText: {
		color: "white",
		fontSize: "0.8rem",
		fontWeight: "500",
		marginHorizontal: "7%",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
	},
	titleText: {
		color: "white",
		fontSize: "1.15rem",
		fontWeight: "600",
		marginHorizontal: "7%",
		marginTop: "10%",
    marginBottom: "1.5rem",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
	},

	// ACHIEVEMENT
	achievementBody: {
		color: "white",
		fontSize: "1.4rem",
		fontWeight: "600",
		marginVertical: "1rem",
    textAlign: "center",
	},
	achievementContainer: {
    width: "40%",
    marginHorizontal: "5%",
    marginTop: "2rem",
    flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	gemImage: {
		width: "6rem",
		height: "6rem",
    justifyContent: "center"
	},

	// ADD BUTTON
	addButtonShared: {
		alignItems: "center",
		backgroundColor: "white",
		borderColor: "#FFC333",
		borderWidth: 3,
		borderRadius: "2.25rem",
		height: "4.5rem",
		justifyContent: "center",
		width: "4.5rem",
	},
	addButton: {
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
	},
	addButtonPressed: {
		marginTop: "0.1rem",
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
    marginTop: 4,
    marginBottom: Dimensions.get("screen").height < 700 ? "1.5rem" : "2rem",
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
		lineHeight: "1.9rem",
	},
	summaryContainer: {
		backgroundColor: "white",
		borderRadius: 15,
		height: "8.2rem",
		width: "90%",
	},
	summaryHeader: {
		alignItems: "flex-start",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: "0.7rem",
	},
	summaryText: {
		fontSize: "1rem",
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
		borderRadius: "0.6rem",
		borderWidth: 2,
		fontSize: "0.9rem",
		height: "2.1rem",
		marginBottom: 100,
		paddingLeft: "0.5rem",
		width: "13rem",
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
		marginTop: "2rem",
    marginBottom: "3.4rem" 
	},
  helpButtonPressed: {
		alignSelf: "center",
		borderRadius: 15,
		justifyContent: "center",
		marginTop: "2.15rem",
    marginBottom: "3.25rem" 
	},
  firstLoad: {
    marginBottom: "2.15rem"
  },
  firstLoadPressed: {
    marginBottom: "2rem"
  },
	helpButtonContainer: {
		height: "2.1rem",
		width: "10rem",
	},
	helpButtonText: {
		fontSize: "0.82rem",
		fontWeight: "600",
	},
	helpContainer: {
		backgroundColor: "#586183",
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		width: "100%",
	},
	helpFlexHeader: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
  helpMargin: {
    marginBottom: "2rem"
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
		gap: "3.5rem",
		marginTop: "30%",
	},
	progressModalContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	progressRock: {
		height: "14rem",
		width: "14rem",
	},
  gemRock: {
    marginVertical: "2rem",
    width: "7.7rem",
		height: "10rem",
  },

	// TROVE PAGE
	troveAchievementList: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	troveBody: {
		color: "white",
		fontSize: "1rem",
		fontWeight: "600",
		marginVertical: "1.1rem",
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
		paddingBottom: "1rem",
	},
	createTabBarContainer: {
		justifyContent: "center",
	},
	createTabBarItem: {
		width: 50,
	},
})
