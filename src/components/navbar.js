import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, Image } from 'react-native';

const navbar = {
    LeftButton(route, navigator, index, navState) {
        if(index > 0) {
            return (
                <TouchableHighlight onPress={ () => {navigator.pop()} } style={styles.navBtn}>
                    <Image source={require('../img/Back48.png')} style={styles.img}/>
                </TouchableHighlight>
            )
        } else { return null }
    },
    RightButton(route, navigator, index, navState) {
        if(route.name === 'Posts') {
            return (
                <TouchableHighlight onPress={ () => { navigator.push({name: 'New Post'}) } } style={styles.navBtn} underlayColor="transparent">
                    <Image source={require('../img/AddFile48.png')} style={styles.img}/>
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
    img: {
        width: 27,
        height: 27,
    },
    navBtn: {
        marginTop: 12
    }
});
