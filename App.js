import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, Alert, NativeModules, DeviceEventEmitter, Linking, ScrollView } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import BlockReels from './components/BlockReels';
import AppIntro from './components/AppIntro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Analytics from './components/Analytics';
import MenuBar from './components/MenuBar';
import Settings from './components/Settings';
import TimerPopup from './components/TimerPopup';

export default function App() {
  // useEffect(() => {
  //   const subscription = DeviceEventEmitter.addListener('ShortsDetected', (message) => {
  //     Alert.alert('Detected', message); // Show popup when event is received
  //   });

  //   return () => {
  //     subscription.remove(); // Clean up listener when the component is unmounted
  //   };
  // }, []);
  const [showAppIntro, setShowAppIntro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('home')
  const checkOverlayPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.SYSTEM_ALERT_WINDOW);
    if (result !== RESULTS.GRANTED) {
      Alert.alert(
        "Permission required",
        "This app needs permission to display popups over other apps. Please allow it in settings.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings()
          }
        ]
      );
    }
  };
  useEffect(() => {
    const checkIntro = async () => {
      try {
        const hasSeenAppIntro = await AsyncStorage.getItem('hasSeenAppIntro');
        if (hasSeenAppIntro === null) {
          setShowAppIntro(true);
        }
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    checkIntro();
  }, []);
  // Call this function when your app starts
  // checkOverlayPermission();
  if (loading) {
    return <View style={styles.loading}><Text>Loading...</Text></View>;
  }

  if (showAppIntro) {
    return <AppIntro setShowAppIntro={setShowAppIntro} />;
  }
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>ReelBored</Text>
        <ScrollView>
        {active==='home'?<><Analytics />
        <BlockReels /></>:
        <Settings/>}
        </ScrollView>
        <MenuBar active={active} setActive={setActive}/>
        <TimerPopup/>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 20,
    margin: 30,
    fontWeight: 'bold'

  }
});
