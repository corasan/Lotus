import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image, ToolbarAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class NavigationBar extends Component {
    render() {
        return (
            // <View style={{backgroundColor: 'blue', height: 50, top: -100}}>
                // <ToolbarAndroid
                //     title="Lotus"
                //     actions={[{title: 'action one', show: 'always'}]}
                // />
            // </View>
            <View style={{backgroundColor: 'blue', height: 60, bottom: 560}}/>
        );
    }
}
