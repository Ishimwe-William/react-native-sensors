import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Sensors from 'expo-sensors';

const Rotation = () => {
    const [heading, setHeading] = useState(0);
    const [orientation, setOrientation] = useState(0);

    useEffect(() => {
        const subscriptionHeading = Sensors.Magnetometer.addListener((data) => {
            // Calculate the heading from the magnetometer data
            const { x, y, z } = data;
            const headingRad = Math.atan2(y, x);
            const headingDeg = (headingRad * 180) / Math.PI + 360;
            setHeading(headingDeg % 360);
        });

        const subscriptionOrientation = Sensors.Accelerometer.addListener((data) => {
            // Calculate the orientation from the accelerometer data
            const { x, y, z } = data;
            const pitch = Math.atan2(x, Math.sqrt(y * y + z * z)) * (180 / Math.PI);
            const roll = Math.atan2(y, z) * (180 / Math.PI);
            setOrientation(Math.sqrt(pitch * pitch + roll * roll));
        });

        return () => {
            subscriptionHeading.remove();
            subscriptionOrientation.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Compass & Rotation</Text>
            <Text style={styles.value}>Heading: {heading.toFixed(2)} degrees</Text>
            <Text style={styles.value}>Orientation: {orientation.toFixed(2)} degrees</Text>
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
    value: {
        fontSize: 18,
        marginVertical: 10,
    },
});

export default Rotation;
