import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, NativeEventEmitter, NativeModules } from 'react-native';

const { MyAccessibilityModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(MyAccessibilityModule);

const ReelPopup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const subscription = eventEmitter.addListener('reelDetected', (event) => {
      setMessage(event.message);
      setModalVisible(true);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
  },
});

export default ReelPopup;
