import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { RadioButton } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faUserLock} from '@fortawesome/free-solid-svg-icons';
import { myContext } from '../context/context';

const TimeSelectOption = ({time, allowTime, setAllowTime}) => {
    const { showTimerPopup, breakTime } = useContext(myContext)
  return (
    <TouchableOpacity style={styles.option} onPress={() => setAllowTime(time)} disabled={(breakTime.maxLimit - breakTime[showTimerPopup.social])<time?true:false}>
        {(breakTime.maxLimit - breakTime[showTimerPopup.social])<time?<FontAwesomeIcon icon={faUserLock} size={17} color='#f5f5f5be' style={{marginHorizontal: 15}}/>
        :<RadioButton value={time}
            status={ allowTime === time ? 'checked' : 'unchecked' }
            color='#49a549'
            unallowTimeColor='#f5f5f5be'
            onPress={() => setAllowTime(time)}/>}
        <Text style={styles.popupText}>{time} minutes</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    option: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        height: 36,
        alignItems: 'center',
        marginVertical: 7
    },
    popupText: {
        color: '#f5f5f5be',
        fontSize: 16,
        marginLeft: 5
    }
})
export default TimeSelectOption