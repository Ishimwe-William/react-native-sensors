import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Accelerometer} from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import {SendPushNotification} from "./assets/Notification";

export const MotionAndSecurity = () => {
    const [acceleration, setAcceleration] = useState({x: 0, y: 0, z: 0});
    const [subscription, setSubscription] = useState(null);
    const [magnitude, setMagnitude] = useState(0);
    const [vibrated, setVibrated] = useState(false);
    const SHAKE_THRESHOLD = 1.5;

    const _slow = () => Accelerometer.setUpdateInterval(1000);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const _subscribe = () => {
        setSubscription(Accelerometer.addListener(setAcceleration));
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const calculateMagnitude = () => {
        const {x, y, z} = acceleration;
        setMagnitude(Math.sqrt((x ** 2 + y ** 2 + z ** 2)))
    }

    const checkVibrationState = () => {
        if (magnitude > SHAKE_THRESHOLD)
            SendPushNotification('Sensors App - Accelerometer','We noticed a movement of shaking!')
    }
    const changeOrientation = async () => {
        const {x, y} = acceleration;
        if (x > 0.65) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        } else if (x < -0.65) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        } else if (y > 0) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_DOWN);
        }
    };

    useEffect(() => {
        changeOrientation();
        calculateMagnitude();
        checkVibrationState()
    }, [acceleration]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accelerometer</Text>
            <Text style={styles.text}>Accelerometer Data:</Text>
            <Text style={styles.text}>x: {acceleration.x.toFixed(5)}</Text>
            <Text style={styles.text}>y: {acceleration.y.toFixed(5)}</Text>
            <Text style={styles.text}>z: {acceleration.z.toFixed(5)}</Text>
            <Text style={styles.text}>magnitude: {magnitude.toFixed(5)}</Text>
            <Text style={styles.text}>Vibrated? {vibrated?'True':'False'}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                    <Text>{subscription ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={styles.button}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    text: {
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
