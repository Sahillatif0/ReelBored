import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faCircleQuestion, faCircleHalfStroke, faBell, faWindowRestore, faCodeBranch, faCode} from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  return (
    <View style={styles.settingsContainer}>
      <Text style={[styles.optionHeading]}>Theme</Text>
      <View style={styles.optionBox}>
        <TouchableOpacity style={styles.box} onPress={()=>{}}>
            <View style={styles.settingBoxIcon}>
            <FontAwesomeIcon icon={faCircleHalfStroke} size={20} color="#9b9494" />
            <Text style={styles.optionText}>Dark</Text>
            </View>
            <Switch style={styles.settingBoxSwitch} value={true} onValueChange={() => console.log('Switch changed')} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.optionHeading]}>Permissions</Text>
      <View style={styles.optionBox}>
        <TouchableOpacity style={styles.box} onPress={()=>{}}>
            <View style={styles.settingBoxIcon}>
            <FontAwesomeIcon icon={faCircleQuestion} size={20} color="#9b9494" />
            <Text style={styles.optionText}>Accessbility Apps</Text>
            </View>
            <Switch style={styles.settingBoxSwitch} value={true} onValueChange={() => console.log('Switch changed')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={()=>{}}>
            <View style={styles.settingBoxIcon}>
            <FontAwesomeIcon icon={faBell} size={20} color="#9b9494" />
            <Text style={styles.optionText}>Notification</Text>
            </View>
            <Switch style={styles.settingBoxSwitch} value={true} onValueChange={() => console.log('Switch changed')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={()=>{}}>
            <View style={styles.settingBoxIcon}>
            <FontAwesomeIcon icon={faWindowRestore} size={20} color="#9b9494" />
            <Text style={styles.optionText}>Popup over other apps</Text>
            </View>
            <Switch style={styles.settingBoxSwitch} value={true} onValueChange={() => console.log('Switch changed')} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.optionHeading]}>App Info</Text>
      <View style={styles.optionBox}>
        <TouchableOpacity style={styles.box} onPress={()=>{}}>
            <View style={styles.settingBoxIcon}>
            <FontAwesomeIcon icon={faCodeBranch} size={20} color="#9b9494" />
            <Text style={styles.optionText}>Version</Text>
            </View>
            <Text style={styles.boxText} >1.0.0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={()=>{}}>
            <View style={styles.settingBoxIcon}>
            <FontAwesomeIcon icon={faCode} size={20} color="#9b9494" />
            <Text style={styles.optionText}>About Us</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    settingsContainer:{
        width: '100%',
        height:'80%',
        alignItems: 'center'
    },
    optionHeading:{
        color: '#f5f5f5',
        fontSize: 16,
        alignSelf: 'flex-start',
        margin: 10,
        marginLeft: 30
        },
    optionBox: {
        display: 'flex',
        width: '90%',
        height: 'max-content',
        borderRadius: 10,
        backgroundColor: '#202020',
    },
    box: {
        display: 'flex',
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    settingBoxIcon: {
        display: 'flex',
        width: 'max-content',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    optionText: {
        color: '#f5f5f5',
        fontSize: 15,
        marginLeft: 10
        // fontWeight: 'bold',
    },
    settingBoxSwitch: {
        display: 'flex',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    boxText: {
        color: '#f5f5f5',
        fontSize: 15,
        marginRight: 20
    }
})
export default Settings