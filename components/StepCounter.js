import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Sensors from 'expo-sensors';

const StepCounter = () => {
    const [steps, setSteps] = useState(0);
    const strideLength = 0.76;
    const [distance, setDistance] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const subscription = Sensors.Pedometer.watchStepCount((result) => {
            if (!isStarted && result.steps > 50) {
                setIsStarted(true);
            }

            if (isStarted) {
                setSteps(result.steps);
                calculateDistance(result.steps);
            }
        });

        return () => {
            subscription.remove();
        };
    }, [isStarted]);

    const calculateDistance = stepCount => {
        const walkedDistance = stepCount * strideLength;
        setDistance(walkedDistance.toFixed(2));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step Counter</Text>
            <Text style={styles.steps}>{steps} steps</Text>
            <Text style={styles.distance}>Distance: {distance} meters</Text>
            <Text style={styles.strideLen}>(Stride Length = {strideLength})</Text>
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
    distance: {
        fontSize: 18,
        marginTop: 10,
    },
    strideLen: {
        fontSize: 12,
        marginTop: 10,
        fontStyle: 'italic',
    },
});

export default StepCounter;
