import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import NavigationBtn from './navigationBtn';

const navbar = {
    LeftButton(route, navigator, index, navState) {
        if(index > 0) {
            return (
                <NavigationBtn onPress={ () => navigator.pop() }  imgSource={require("../../img/Back48.png")} />
            )
        } else { return null }
    },
    RightButton(route, navigator, index, navState) {
        if(route.name === 'Posts') {
            return (
                <NavigationBtn onPress={() => navigator.push({name: 'New Post'}) } imgSource={require("../../img/AddFile48.png")} />
            )
        }
    },
    Title(route, navigator, index, navState) {
        return <Text style={{marginTop: 10, fontSize: 20, color: 'white'}}>{route.name}</Text>
    }
}

export default navbar;
