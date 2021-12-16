import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from "react-native";


export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#6CC417" />
            <Text style={{color:"#6CC417", marginLeft: 10, fontSize: 20}}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"row"
    }
})