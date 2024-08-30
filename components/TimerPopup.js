import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useContext } from 'react'
import { myContext } from '../context/context';
import TimeSelectOption from './TimeSelectOption';

const TimerPopup = () => {
    const [allowTime, setAllowTime] = React.useState(5);
    const { showTimerPopup, setShowTimerPopup, setIsReelBoredActive, setBreakTime, breakTime, setRemBreakTime, remBreakTime } = useContext(myContext);
    
  return (
    <View style={styles.big_container}>
    <View style={styles.container}>
        <Text style={styles.popupHeading}>Turn off ReelBored</Text>
        <TimeSelectOption time={5} allowTime={allowTime} setAllowTime={setAllowTime}/>
        <TimeSelectOption time={10} allowTime={allowTime} setAllowTime={setAllowTime}/>
        <TimeSelectOption time={15} allowTime={allowTime} setAllowTime={setAllowTime}/>
        <TimeSelectOption time={30} allowTime={allowTime} setAllowTime={setAllowTime}/>
        <View style={styles.buttons}>
            <TouchableOpacity>
                <Text style={[styles.popupText, {color: '#f5f5f5', marginRight: 13}]} onPress={()=>{setShowTimerPopup({show: false, social: showTimerPopup.social}); setIsReelBoredActive(true, showTimerPopup.social); setAllowTime(0)}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={[styles.popupText, {color: '#49a549', fontWeight: 'bold'}]} disabled={(breakTime.maxLimit - breakTime[showTimerPopup.social])<allowTime?true:false} onPress={()=>{setShowTimerPopup({show: false, social: showTimerPopup.social}); setBreakTime(allowTime+breakTime[showTimerPopup.social], showTimerPopup.social); setRemBreakTime(remBreakTime[showTimerPopup.social]+allowTime, showTimerPopup.social);}}>Confirm</Text>
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