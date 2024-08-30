import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useMemo} from 'react';
import { StyleSheet, Text, View, Button, Alert, NativeModules, DeviceEventEmitter, Linking, ScrollView } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import BlockReels from './components/BlockReels';
import AppIntro from './components/AppIntro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Analytics from './components/Analytics';
import MenuBar from './components/MenuBar';
import Settings from './components/Settings';
import TimerPopup from './components/TimerPopup';
import { myContext } from './context/context';

export default function App() {
  // useEffect(() => {
  //   const subscription = DeviceEventEmitter.addListener('ShortsDetected', (message) => {
  //     Alert.alert('Detected', message); // Show popup when event is received
  //   });

  //   return () => {
  //     subscription.remove(); // Clean up listener when the component is unmounted
  //   };
  // }, []);
  const [data, setdata] = useState(
    {
      darkMode: false,
      setDarkMode: (val)=>
        {setdata((prevData)=>({...prevData, darkMode: val}));},
      permissions: {access: false, notify: false, overlay: false},
      setPermissions: (val, perm)=>
        {setdata((prevData)=>({...prevData, permissions: {...prevData.permissions, [perm]: val}}));},
      showTimerPopup: {show: false, social: ''},
      setShowTimerPopup: (val)=>
        {setdata((prevData)=>({...prevData, showTimerPopup: val}));},
      breakTime: {yt: 0, fb: 0, insta: 0, snap: 0, maxLimit: 30},
      setBreakTime: (val, social)=>
        {setdata((prevData)=>({...prevData, breakTime: {...prevData.breakTime, [social]: val}}));},
      remBreakTime: {yt: 0, fb: 0, insta: 0, snap: 0},
      setRemBreakTime: (val, social)=>
        {setdata((prevData)=>({...prevData, remBreakTime: {...prevData.remBreakTime, [social]: val}}));},
      isReelBoredActive: {yt: false, fb: false, insta: false, snap: false},
      setIsReelBoredActive: (val, social)=>
        {setdata((prevData)=>({...prevData, isReelBoredActive: {...prevData.isReelBoredActive, [social]: val}}));}


    });
  const value = useMemo(() => ({
    darkMode: data.darkMode,
    setDarkMode: data.setDarkMode,
    showTimerPopup: data.showTimerPopup,
    setShowTimerPopup: data.setShowTimerPopup,
    breakTime: data.breakTime,
    setBreakTime: data.setBreakTime,
    remBreakTime: data.remBreakTime,
    setRemBreakTime: data.setRemBreakTime,
    isReelBoredActive: data.isReelBoredActive,
    setIsReelBoredActive: data.setIsReelBoredActive,
    permissions: data.permissions,
    setPermissions: data.setPermissions
  }), [data]);
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
    <myContext.Provider value={value}>
      <View style={styles.container}>
        <Text style={styles.heading}>ReelBored</Text>
        <ScrollView>
        {active==='home'?<><Analytics />
        <BlockReels /></>:
        <Settings/>}
        </ScrollView>
        <MenuBar active={active} setActive={setActive}/>
        {data.showTimerPopup.show && <TimerPopup/>}
     </View>
     </myContext.Provider>
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
