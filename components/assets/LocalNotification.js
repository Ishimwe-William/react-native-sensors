import * as Notifications from 'expo-notifications';

export const SendLocalNotification = async (title, message) => {
    try {
        const {status} = await Notifications.requestPermissionsAsync();

        if (status !== 'granted') {
            alert('Permission to show notifications was denied');
            return;
        }

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: message,
            },
            trigger: null,
            android: {
                channelId: 'default',
                priority: 'high',
            },
        });

        console.log(`Notification scheduled with ID: ${notificationId}`);
    } catch (error) {
        console.error('Error scheduling notification:', error);
    }
};
