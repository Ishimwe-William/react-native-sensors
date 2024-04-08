import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Pedometer from 'expo-sensors';

const StepCounter = () => {
    const [steps, setSteps] = useState(0);

    useEffect(() => {
        const subscription = Pedometer.Pedometer.watchStepCount((result) => {
            setSteps(result.steps);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step Counter</Text>
            <Text style={styles.steps}>{steps} steps</Text>
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
    steps: {
        fontSize: 48,
        fontWeight: 'bold',
    },
});

export default StepCounter;
