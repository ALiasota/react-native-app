import React from "react";

import {
  StyleSheet,
  Text,
  View,  
} from "react-native";

export default function CreateScreen() {
    return (
        <View style={styles.container}>
            <Text>CreateScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    }
})