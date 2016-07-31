import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, Image } from 'react-native';

const navbar = {
    LeftButton(route, navigator, index, navState) {
        if(index > 0) {
            return (
                <TouchableHighlight onPress={ () => {navigator.pop()} }>
                    <Text>Back</Text>
                </TouchableHighlight>
            )
        } else { return null}
    },
    RightButton(route, navigator, index, navState) {
        if(route.name === 'Posts') {
            return (
                <TouchableHighlight onPress={ () => {console.log('Pressed')} }>
                    <Image source={require('../img/AddFile48.png')} style={styles.addPostImg}/>
                </TouchableHighlight>
            )
        }
    },
    Title(route, navigator, index, navState) {
        return <Text style={styles.title}>{route.name}</Text>
    }
}

export default navbar;

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        fontSize: 20,
    },
    addPostImg: {
        width: 30,
        height: 35,
        marginTop: 5
    }
});
