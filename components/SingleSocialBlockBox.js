import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { myContext } from '../context/context'

const SingleSocialBlockBox = ({icon,name,symbol,showdifficulty, changeShowDifficulty }) => {
    const {showTimerPopup, setShowTimerPopup, isReelBoredActive,setIsReelBoredActive,remBreakTime } = useContext(myContext)
  return (
    <TouchableOpacity  style={styles.social_container} onPress={()=>{setIsReelBoredActive(!isReelBoredActive[symbol], symbol); changeShowDifficulty(symbol); isReelBoredActive[symbol]&&setShowTimerPopup({show: true, social: symbol});}}>
        <View style={styles.social_container_switch}>
            <Image style={styles.social_icon} source={icon}/>
            <View style={styles.social_details_view}>
                <Text style={styles.social_name} >{name}</Text>
                {!isReelBoredActive[symbol] && <Text style={styles.social_break_time_avail} >Break time: {remBreakTime[symbol]} mint(s)</Text>}
            </View>
            <View style={styles.toggleView}>
                <Switch style={styles.toggleSwitch} onChange={()=>{setIsReelBoredActive(!isReelBoredActive[symbol], symbol); changeShowDifficulty(symbol); isReelBoredActive[symbol]&&setShowTimerPopup({show: true, social: symbol});}} value={isReelBoredActive[symbol]}/>
            </View>
        </View>
        {showdifficulty[symbol] && <TouchableOpacity style={styles.social_container_difficulty}>
            <View style={[styles.difficulty_container, {justifyContent: 'flex-start'}]}><Text style={styles.difficulty_text}>Difficulty</Text></View>
            <View style={styles.difficulty_container}><Text style={styles.difficulty_text}>Easy</Text>
            <FontAwesomeIcon icon={faAngleRight} size={15} color="#e7e7e7" />
            </View>
        </TouchableOpacity>}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    social_container: {
        display: 'flex',
        width: '100%',
        height: 'max-content',
        backgroundColor: '#202020',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingRight: 0,
        borderRadius: 10,
        marginBottom: 10,
      },
      toggleView:{
        display: 'flex',
        width: '20%',
        height: '100%',
        justifyContent: 'flex-end',
    
      },
      toggleSwitch:{
        width: 60,
        height: '100%'
      },
      social_container_switch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 50
        
    
      },
        social_details_view: {
            width: '70%',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 10,
        },
      social_icon: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        padding: 10,
        borderRadius: 20,
      },
        social_name: {
            color: 'white',
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 10,
        },
      social_container_difficulty: {
        width: '90%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: '#d6d5d522',
        borderTopWidth: 1,
      },
        difficulty_container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '50%',
        },
        difficulty_text: {
            color: '#e7e7e7',
            fontWeight: 'bold',
            fontSize: 13,
            marginRight: 5,
        },
        social_break_time_avail: {
            color: '#cac142',
            fontSize: 13,
            marginLeft: 10,
        }
})
export default SingleSocialBlockBox