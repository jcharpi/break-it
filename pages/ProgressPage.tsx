import NavBar from "../components/NavBar"
import { Image, Modal, StyleSheet, View } from "react-native"
import { useContext, useState } from "react"
import rockImage from "../images/rock.png"
import AddButton from "../components/AddButton"
import WhatNowPage from "./WhatNowPage"
import ModalViewContext from "../contexts/ModalViewContext"

export default function ProgressPage({ navigation }: any) {
    const [modalVisible, setModalVisible] = useContext(ModalViewContext);

    function handleHelp() {
        setModalVisible(() => !modalVisible)
    }

    function handleTrove() {
        navigation.navigate('TrovePage')
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
                <Image source={rockImage}/>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(() => false)}
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
    helpImage: {
        width: 44,
        height: 30
    },
    troveImage: {
        width: 44,
        height: 44
    }
})