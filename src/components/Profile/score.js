import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Score extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    }
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 18}}>{this.props.title}</Text>
                <Text style={{color: '#02C39A', fontWeight: '900', fontSize: 24}}>{this.props.score}</Text>
            </View>
        );
    }
}
