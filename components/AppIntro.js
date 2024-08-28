import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    key: 'one',
    title: 'Welcome',
    text: 'This is an app intro!',
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Features',
    text: 'We have cool features.',
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Get Started',
    text: 'Let\'s get started!',
    backgroundColor: '#22bcb5',
  }
];

const AppIntro = ({ setShowAppIntro }) => {

  const _renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _onDone = async () => {
    // Save the flag to AsyncStorage
    await AsyncStorage.setItem('hasSeenAppIntro', 'true');
    setShowAppIntro(false); // Proceed to main app
  };

  return (
    <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} />
  );
};

export default AppIntro;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 10
  }
});
