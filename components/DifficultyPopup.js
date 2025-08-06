import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { RadioButton } from 'react-native-paper';
import React, { useContext } from 'react'
import { myContext } from '../context/context';

const DifficultyPopup = () => {
    const {isDifficultyHard, setIsDifficultyHard, setShowDifficultyPopup, showDifficultyPopup} = useContext(myContext)
  return (
    <View style={styles.big_container}>
    <View style={styles.container}>
        <Text style={styles.popupHeading}>Select Difficulty</Text>
        <TouchableOpacity style={styles.option} onPress={()=>{setShowDifficultyPopup(false,showDifficultyPopup.social); setIsDifficultyHard(false, showDifficultyPopup.social)}}> 
            <RadioButton value={!isDifficultyHard[showDifficultyPopup.social]}
                status={ !isDifficultyHard[showDifficultyPopup.social] ? 'checked' : 'unchecked' }
                color='#49a549'
                unallowTimeColor='#f5f5f5be'
                onPress={()=>{setShowDifficultyPopup(false,showDifficultyPopup.social); setIsDifficultyHard(false, showDifficultyPopup.social)}}/>
            <Text style={styles.popupText}>Easy (Allow first reel/short)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={()=>{setShowDifficultyPopup(false,showDifficultyPopup.social); setIsDifficultyHard(true, showDifficultyPopup.social)}}>
            <RadioButton value={isDifficultyHard[showDifficultyPopup.social]}
                status={ isDifficultyHard[showDifficultyPopup.social] ? 'checked' : 'unchecked' }
                color='#49a549'
                unallowTimeColor='#f5f5f5be'
                onPress={()=>{setShowDifficultyPopup(false,showDifficultyPopup.social); setIsDifficultyHard(true, showDifficultyPopup.social)}}/>
            <Text style={styles.popupText}>Hard (Block all reels/shorts)</Text>
        </TouchableOpacity>
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
        height: '20%',
        width: '75%',
        display: 'flex',
        backgroundColor: '#1a1919',
        borderRadius: 10,
        padding: 17
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7
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
    }

})

export default DifficultyPopup