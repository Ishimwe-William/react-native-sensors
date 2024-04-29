import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Accelerometer} from 'expo-sensors';
import * as ScreenOrientation from "expo-screen-orientation";

export const MotionAndSecurity = () => {
    const [{x, y, z}, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [magnitude, setMagnitude] = useState(0);

    const [subscription, setSubscription] = useState(null);

    const _slow = () => Accelerometer.setUpdateInterval(1000);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(Accelerometer.addListener(setData));
    };

    useEffect(() => {
        setMagnitude(Math.sqrt(x ** 2 + y ** 2 + z ** 2))
        changeOrientation()
    }, [x, y, z]);

    useEffect(() => {
        return () => {
            ScreenOrientation.removeOrientationChangeListeners(subscription);
        };
    }, []);


    const changeOrientation = async () => {
        if (x > 0.70) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        } else if (x < -0.70) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        } else {
            if (y > 0) {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_DOWN);
            }
        }
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accelerometer</Text>

            <Text style={styles.text}>Magnitude: {magnitude.toFixed(3)}</Text>
            <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
            <Text style={styles.text}>x: {x.toFixed(5)}</Text>
            <Text style={styles.text}>y: {y.toFixed(5)}</Text>
            <Text style={styles.text}>z: {z.toFixed(5)}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
                    <Text>{subscription ? 'On' : 'Off'}</Text>
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
