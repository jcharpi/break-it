// REACT HOOKS & COMPONENTS
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function SliderMarker() {
  return <View style={styles.container}/>
}

const styles = StyleSheet.create({
    container: {
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: "#DDE2F5",
        marginLeft: 7
    }
})
