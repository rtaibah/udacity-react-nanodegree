import {Notifications, Permissions} from 'expo';
import {AsyncStorage} from 'react-native';

const NOTIFICATION_KEY = 'UdaciCard:notifications';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync,
  );
}

function createNotification() {
  return {
    title: 'Practice your flash cards!',
    body: "don't forget to practice today!",
    ios: {
      sound: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(22);
            tomorrow.setMinutes(23);

            Notifications.scheduleLocalNotificationAsync(
              this.createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              },
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
