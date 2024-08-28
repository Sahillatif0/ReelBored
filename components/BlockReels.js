import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import yt_Icon from '../assets/images/yt2.png'
import fb_Icon from '../assets/images/fb.png'
import insta_Icon from '../assets/images/insta.png'
import snap_Icon from '../assets/images/snap.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faArrowRight, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const BlockReels = () => {
    const [isYTEnabled, setIsYTEnabled] = useState(false);
    const [isFBEnabled, setIsFBEnabled] = useState(false);
    const [isInstaEnabled, setIsInstaEnabled] = useState(false);
    const [isSnapEnabled, setIsSnapEnabled] = useState(false);
    const [showdifficulty, setShowDifficulty] = useState({yt: false, fb: false, insta: false, snap: false});
    const changeShowDifficulty=(val)=>{
        let newShow = {yt: false, fb: false, insta: false, snap: false};
        newShow[val] = true;
        if(showdifficulty[val])
            newShow[val] = false;
        setShowDifficulty(newShow);
    }
  return (
    <View  style={styles.container}>
        <TouchableOpacity  style={[styles.social_container,  styles.social_container_1]} onPress={()=>{changeShowDifficulty('yt')}}>
            <View style={styles.social_container_switch}>
                <Image style={styles.social_icon} source={yt_Icon}/>
                {/* <View ></View> */}
                <View style={styles.social_details_view}>
                    <Text style={styles.social_name} >Youtube Shorts</Text>
                    {/* <Text>Youtube Shorts</Text> */}

                </View>
                <View style={styles.toggleView}>
                    <Switch style={styles.toggleSwitch} onChange={()=>{setIsYTEnabled(!isYTEnabled)}} value={isYTEnabled}/>
                </View>
            </View>
            {showdifficulty.yt && <TouchableOpacity style={styles.social_container_difficulty}>
                <View style={[styles.difficulty_container, {justifyContent: 'flex-start'}]}><Text style={styles.difficulty_text}>Difficulty</Text></View>
                <View style={styles.difficulty_container}><Text style={styles.difficulty_text}>Easy</Text>
                <FontAwesomeIcon icon={faAngleRight} size={15} color="#e7e7e7" />
                </View>
            </TouchableOpacity>}
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.social_container,  styles.social_container_2]} onPress={()=>{changeShowDifficulty('fb')}}>
            <View style={styles.social_container_switch}>
                <Image style={styles.social_icon} source={fb_Icon}/>
                <View style={styles.social_details_view}>
                    <Text style={styles.social_name} >Facebook Reels</Text>
                    {/* <Text>Youtube Shorts</Text> */}

                </View>
                <View style={styles.toggleView}>
                    <Switch style={styles.toggleSwitch} onChange={()=>{setIsFBEnabled(!isFBEnabled)}} value={isFBEnabled}/>
                </View>
            </View>
            {showdifficulty.fb && <TouchableOpacity style={styles.social_container_difficulty}>
                <View style={[styles.difficulty_container, {justifyContent: 'flex-start'}]}><Text style={styles.difficulty_text}>Difficulty</Text></View>
                <View style={styles.difficulty_container}><Text style={styles.difficulty_text}>Easy</Text>
                <FontAwesomeIcon icon={faAngleRight} size={15} color="#e7e7e7" />
                </View>
            </TouchableOpacity>}
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.social_container,  styles.social_container_3]} onPress={()=>{changeShowDifficulty('insta')}}>
            <View style={styles.social_container_switch}>
                <Image style={styles.social_icon} source={insta_Icon}/>
                <View style={styles.social_details_view}>
                    <Text style={styles.social_name} >Instagram Reels</Text>
                    {/* <Text>Youtube Shorts</Text> */}

                </View>
                <View style={styles.toggleView}>
                    <Switch style={styles.toggleSwitch} onChange={()=>{setIsInstaEnabled(!isInstaEnabled)}} value={isInstaEnabled}/>
                </View>
            </View>
            {showdifficulty.insta && <TouchableOpacity style={styles.social_container_difficulty}>
                <View style={[styles.difficulty_container, {justifyContent: 'flex-start'}]}><Text style={styles.difficulty_text}>Difficulty</Text></View>
                <View style={styles.difficulty_container}><Text style={styles.difficulty_text}>Easy</Text>
                <FontAwesomeIcon icon={faAngleRight} size={15} color="#e7e7e7" />
                </View>
            </TouchableOpacity>}
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.social_container,  styles.social_container_3]} onPress={()=>{changeShowDifficulty('snap')}}>
            <View style={styles.social_container_switch}>
                <Image style={styles.social_icon} source={snap_Icon}/>
                <View style={styles.social_details_view}>
                    <Text style={styles.social_name} >Snapchat Spotlights</Text>
                    {/* <Text>Youtube Shorts</Text> */}

                </View>
                <View style={styles.toggleView}>
                    <Switch style={styles.toggleSwitch} onChange={()=>{setIsSnapEnabled(!isSnapEnabled)}} value={isSnapEnabled}/>
                </View>
            </View>
            {showdifficulty.snap && <TouchableOpacity style={styles.social_container_difficulty}>
                <View style={[styles.difficulty_container, {justifyContent: 'flex-start'}]}><Text style={styles.difficulty_text}>Difficulty</Text></View>
                <View style={styles.difficulty_container}><Text style={styles.difficulty_text}>Easy</Text>
                <FontAwesomeIcon icon={faAngleRight} size={15} color="#e7e7e7" />
                </View>
            </TouchableOpacity>}
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '40%',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    // backgroundColor: "red"
  },
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
    // backgroundColor: 'white',
    borderRadius: 20,
  },
    social_name: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    // toggleSwitch: {
    //     flex: 1,
    //     width: '10%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // height: 40,

    // },
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
})

export default BlockReels