import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import NavigationBtn from './navigationBtn';

const navbar = {
    LeftButton(route, navigator, index, navState) {
        if(index > 0) {
            return (
                <NavigationBtn onPress={ () => navigator.pop() }  imgSource={require("../../img/left.png")} />
            )
        } else { return null }
    },
    RightButton(route, navigator, index, navState) {

    },
    Title(route, navigator, index, navState) {
        if (route.name === 'Show Post') {
            return <Text style={{marginTop: 10, fontSize: 20, color: 'white', fontWeight: '900'}}>Comments</Text>
        }
        return <Text style={{marginTop: 10, fontSize: 20, color: 'white', fontWeight: '900'}}>{route.name}</Text>
    }
}

export default navbar;
