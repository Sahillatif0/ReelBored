import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';

const TimerPopup = () => {
    const [allowTime, setAllowTime] = React.useState(5);
  return (
    <View style={styles.big_container}>
    <View style={styles.container}>
        <Text style={styles.popupHeading}>Turn off ReelBored</Text>
        <TouchableOpacity style={styles.option} onPress={() => setAllowTime(5)}>
            <RadioButton value={5}
            status={ allowTime === 5 ? 'checked' : 'unchecked' }
            style={styles.radiobutton}
            color='#49a549'
            unallowTimeColor='#f5f5f5be'
            onPress={() => setAllowTime(5)}/>
            <Text style={styles.popupText}>5 minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setAllowTime(10)}>
            <RadioButton value={10}
                status={ allowTime === 10 ? 'checked' : 'unchecked' }
                style={styles.radiobutton}
                color='#49a549'
                unallowTimeColor='#f5f5f5be'
                onPress={() => setAllowTime(10)}/>
            <Text style={styles.popupText}>10 minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setAllowTime(15)}>
            <RadioButton value={15}
                status={ allowTime === 15 ? 'checked' : 'unchecked' }
                style={styles.radiobutton}
                color='#49a549'
                unallowTimeColor='#f5f5f5be'
                onPress={() => setAllowTime(15)}/>
            <Text style={styles.popupText}>15 minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setAllowTime(30)}>
            <RadioButton value={30}
            status={ allowTime === 30 ? 'checked' : 'unchecked' }
            style={styles.radiobutton}
            color='#49a549'
            unallowTimeColor='#f5f5f5be'
            onPress={() => setAllowTime(30)}/>
            <Text style={styles.popupText}>30 minutes</Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
            <TouchableOpacity>
                <Text style={[styles.popupText, {color: '#f5f5f5', marginRight: 13}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={[styles.popupText, {color: '#49a549', fontWeight: 'bold'}]}>Confirm</Text>
            </TouchableOpacity>
        </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
    big_container:{
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container:{
        height: '40%',
        width: '75%',
        display: 'flex',
        backgroundColor: '#1a1919',
        borderRadius: 10,
        padding: 17
    },
    popupHeading:{
        color: '#f5f5f5',
        fontSize: 20,
        alignSelf: 'center',
        margin: 10,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        marginVertical: 7
    },
    popupText: {
        color: '#f5f5f5be',
        fontSize: 16,
        marginLeft: 5
    },
    buttons:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },

})
export default TimerPopup