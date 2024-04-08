import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StepCounter from './components/StepCounter';
import GPSTracker from './components/GPSTracker';
import LightSensor from './components/LightSensor';
import Compass from './components/Compass';
import Rotation from "./components/Rotation";

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Step Counter"
                    component={StepCounter}
                    options={{
                        tabBarIcon: ({color}) => <FontAwesome size={28} name="blind" color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="GPS Tracker"
                    component={GPSTracker}
                    options={{
                        tabBarIcon: ({color}) => <FontAwesome size={28} name="globe" color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="Light Sensor"
                    component={LightSensor}
                    options={{
                        tabBarIcon: ({color}) => <FontAwesome size={28} name="bolt" color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="Compass"
                    component={Compass}
                    options={{
                        tabBarIcon: ({color}) => <FontAwesome size={28} name="compass" color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="Rotation"
                    component={Rotation}
                    options={{
                        tabBarIcon: ({color}) => <FontAwesome size={28} name="retweet" color={color}/>,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
