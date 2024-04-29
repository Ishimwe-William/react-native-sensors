import {StyleSheet, Text, View} from "react-native";
import {WebView} from 'react-native-webview';
import React from "react";

export default function Rotation() {

    return (
        <View style={{flex: 1, marginTop: '5%',}}>
            <Text style={styles.title}>WebView</Text>
            <WebView
                source={{uri: 'https://www.youtube.com/watch?v=OGwwX7Oe7xc'}}
                style={{flex: 1}}
                allowsFullscreenVideo={true}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
