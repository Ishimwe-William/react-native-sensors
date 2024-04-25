import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Brightness from 'expo-brightness';
import * as Sensors from 'expo-sensors';
import {useIsFocused} from '@react-navigation/native';


const LightSensor = () => {
    const [lightLevel, setLightLevel] = useState(0);
    const [isScreenCovered, setIsScreenCovered] = useState(false);
    const isFocused = useIsFocused();
    const SCREEN_COVER_THRESHOLD = 30;
    const currentBrightnessRef = useRef();

    useEffect(() => {
        const fetchBrightness = async () => {
            try {
                currentBrightnessRef.current = await Brightness.getBrightnessAsync();
            } catch (error) {
                console.error('Error fetching brightness:', error);
            }
        };

        fetchBrightness();
    }, [isFocused]);

    useEffect(() => {
        if (isFocused) {
            const subscription = Sensors.LightSensor.addListener((data) => {
                setLightLevel(data.illuminance);
                checkScreenCover(data.illuminance);
            });

            return () => {
                subscription.remove();
            };
        }
    }, [isFocused]);

    const checkScreenCover = async (illuminance) => {
        if (illuminance <= SCREEN_COVER_THRESHOLD && isFocused) {
            setIsScreenCovered(true);
            await turnOffScreen();
            return;
        }
        setIsScreenCovered(false);
        await restoreBrightness()
    };

    const restoreBrightness = async () => {
        if (currentBrightnessRef.current !== undefined) {
            try {
                await Brightness.setSystemBrightnessAsync(currentBrightnessRef.current);
            } catch (error) {
                console.error('Error setting brightness:', error);
            }
        }
    };

    const turnOffScreen = async () => {
        try {
            await Brightness.setSystemBrightnessAsync(0);
        } catch (error) {
            console.error('Error turning off screen:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Light Sensor</Text>
            <Text style={styles.lightLevel}>
                Light level: {isScreenCovered ? 'Screen covered' : lightLevel.toFixed(2) + ' lux'}
            </Text>
            <Text style={styles.threshold}>Screen is covered below {SCREEN_COVER_THRESHOLD} lux!</Text>
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
    threshold: {
        fontSize: 12,
        marginTop: 10,
        fontStyle: 'italic',
    },
});

export default LightSensor;
