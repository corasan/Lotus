import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, Image } from 'react-native';

export default class NavigationBtn extends Component {
    render() {
        return(
            <TouchableHighlight onPress={this.props.onPress} style={styles.navBtn} underlayColor="transparent">
                <Image source={this.props.source} style={styles.img}/>
            </TouchableHighlight>
        );
    }
}

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
