import * as Notifications from 'expo-notifications';

const SendLocalNotification = async (title, message) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: message,
        },
        trigger: null,
    });
};

export default SendLocalNotification;
