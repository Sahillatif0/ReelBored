import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faHome, faGear} from '@fortawesome/free-solid-svg-icons';

const MenuBar = ({active, setActive}) => {
    
  return (
      <View  style={styles.container} >
        <TouchableOpacity style={[styles.menuItem, styles.active]} onPress={()=>{setActive('home')}}>
        <FontAwesomeIcon icon={faHome} size={30} color={active==='home'?"#f5f5f5":"#9b9494"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={()=>{setActive('settings')}}>
        <FontAwesomeIcon icon={faGear} size={30} color={active==='settings'?"#f5f5f5":"#9b9494"} />
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '10%',
        marginTop: 20,
        // backgroundColor: '#202020'
    },
    menuItem:{
        width: '50%',
        height: '100%',
        // backgroundColor: '#130e0e',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        // backgroundColor: '#202020'
    }
})
export default MenuBar