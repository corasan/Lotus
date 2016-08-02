import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';

export default class ShowPost extends Component {
    render() {
        return (
            <Text>{this.props.id}</Text>
        );
    }
}
