import { View, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import yt_Icon from '../assets/images/yt2.png'
import fb_Icon from '../assets/images/fb.png'
import insta_Icon from '../assets/images/insta.png'
import snap_Icon from '../assets/images/snap.png'
import SingleSocialBlockBox from './SingleSocialBlockBox'

const BlockReels = () => {
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
        <SingleSocialBlockBox icon={yt_Icon} name="Youtube Shorts" symbol="yt" showdifficulty={showdifficulty} changeShowDifficulty={changeShowDifficulty} />
        <SingleSocialBlockBox icon={fb_Icon} name="Facebook Reels" symbol="fb" showdifficulty={showdifficulty} changeShowDifficulty={changeShowDifficulty} />
        <SingleSocialBlockBox icon={insta_Icon} name="Instagram Reels" symbol="insta" showdifficulty={showdifficulty} changeShowDifficulty={changeShowDifficulty} />
        <SingleSocialBlockBox icon={snap_Icon} name="Snapchat Spotlights" symbol="snap" showdifficulty={showdifficulty} changeShowDifficulty={changeShowDifficulty} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    padding: 15,
    paddingTop: 25
    // backgroundColor: "red"
  }
})

export default BlockReels