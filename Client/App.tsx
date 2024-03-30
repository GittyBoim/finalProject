import React, { useEffect, useState } from 'react';
import {Alert, PermissionsAndroid, StyleSheet } from 'react-native';
import { Button, DefaultTheme, PaperProvider, useTheme } from 'react-native-paper';
import { Navigation } from './src/components/navigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { StatusBar } from 'react-native';
import { Notification } from './src/components/notification';

function App(): JSX.Element {

  const [visibleNotification, setVisibleNotification] = useState(false);
  const [notificationBody, setNotificationBody] = useState("");

    useEffect(() => {
       
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        setNotificationBody(remoteMessage.notification?.body? JSON.stringify(remoteMessage.notification?.body): "");
        setVisibleNotification(true);
      });

      return unsubscribe;

    }, []);

    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary:'black',
        colorSecondary:'black',
        background: 'white',
        surface : 'white',
        placeholder :'black',
      },

    };
     
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <StatusBar backgroundColor='rgba(245, 246, 250, 1)' barStyle="dark-content" />
          <Navigation/>
          <Notification visible={visibleNotification} setVisible={setVisibleNotification} body={notificationBody}/>
        </PaperProvider>
      </Provider>
    );

}

export default App;



