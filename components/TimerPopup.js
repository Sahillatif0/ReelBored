import { View, Text, StyleSheet, TextInput,  } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';

const TimerPopup = () => {
    const [checked, setChecked] = React.useState('first');
  return (
    <View style={styles.container}>
        <View style={styles.option}>
            <RadioButton value="first"
            status={ checked === 'first' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('first')}/>
            <Text style={styles.popupText}>Timer</Text>
        </View>
        <View style={styles.option}>
            <RadioButton value="2nd"
            status={ checked === '2nd' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('2nd')}/>
            <Text style={styles.popupText}>Timer</Text>
        </View>
        <View style={styles.option}>
            <RadioButton value="4rd"
            status={ checked === '4rd' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('4rd')}/>
            <Text style={styles.popupText}>Timer</Text>
        </View>
      <Text style={styles.popupText}>Hello</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        height: '40%',
        width: '70%',
        top: '30%',
        left: '15%',
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 10
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        height: '20%',
        alignItems: 'center',
        margin: 10
    },
    popupText: {
        color: '#f5f5f5',
        fontSize: 20
    }
})
export default TimerPopup