import NavBar from "../components/NavBar"
import { Image, Modal, Pressable, StyleSheet, View } from "react-native"
import { useContext } from "react"
import rockImage from "../images/rock.png"
import AddButton from "../components/AddButton"
import WhatNowPage from "./WhatNowPage"
import WhatNowModalContext from "../contexts/whatNowModalContext"
import Summary from "../components/Summary"
import SummaryModalContext from "../contexts/summaryModalContext"

export default function ProgressPage({ navigation }: any) {
    const [whatNowModalVisible, setWhatNowModalVisible] = useContext(WhatNowModalContext);
    const [summaryModalVisible, setSummaryModalVisible] = useContext(SummaryModalContext);

    function handleHelp() {
        setWhatNowModalVisible(() => !whatNowModalVisible)
    }

    function handleTrove() {
        navigation.navigate('TrovePage')
    }

    function openSummaryModal() {
        setSummaryModalVisible(() => true)
    }

    function closeSummaryModal() {
        setSummaryModalVisible(() => false)
    }
    
    return (
        <View style={styles.container}>
            <NavBar 
                handleLeftIcon={handleHelp}
                handleRightIcon={handleTrove}
                leftIconName='question'
                rightIconName='mountain'
                title="Progress"
            />
            <View style={styles.flexView}>
                <Pressable onPress={openSummaryModal}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={summaryModalVisible}
                        onRequestClose={() => setSummaryModalVisible(() => false)}
                        presentationStyle="overFullScreen"
                    >
                        <View style={styles.modalContainer}>
                            <Summary/>
                        </View>
                        <Pressable style={styles.modalOverlay} onPress={closeSummaryModal} />
                    </Modal>
                    <Image source={rockImage}/>
                </Pressable>
                <Modal
                    animationType="slide"
                    visible={whatNowModalVisible}
                    onRequestClose={() => setWhatNowModalVisible(() => false)}
                    presentationStyle="pageSheet"
                >
                    <WhatNowPage modalView={true} />
                </Modal>
                <AddButton/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#586183"
    },
    flexView: {
        marginTop: "40%",
        flexDirection: "column",
        alignItems:"center",
        gap: 60
    }, 
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalOverlay: {  
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})