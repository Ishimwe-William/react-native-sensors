import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Sensors from 'expo-sensors';

const LightSensor = () => {
    const [lightLevel, setLightLevel] = useState(0);

    useEffect(() => {
        const subscription = Sensors.LightSensor.addListener((data) => {
            setLightLevel(data.illuminance);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Light Sensor</Text>
            <Text style={styles.lightLevel}>
                Light level: {lightLevel.toFixed(2)} lux
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    lightLevel: {
        fontSize: 18,
    },
});

export default LightSensor;
