import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, Image } from 'react-native';
import NavigationBtn from './navigationBtn';
import firebase from '../../firebaseInit';

const navbar = {
    LeftButton(route, navigator, index, navState) {
        if(index > 0) {
            return (
                <NavigationBtn onPress={ () => {navigator.pop()} } source={require('../img/Back48.png')} />
            )
        } else { return null }
    },
    RightButton(route, navigator, index, navState) {
        if(route.name === 'Posts') {
            return (
                <NavigationBtn onPress={ () => { navigator.push({name: 'New Post'})} } source={require('../img/AddFile48.png')}/>
            )
        }
    },
    Title(route, navigator, index, navState) {
        return <Text style={{marginTop: 10, fontSize: 20}}>{route.name}</Text>
    }
}

export default navbar;
