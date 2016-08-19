import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Score extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    }
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.score}>{this.props.score}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    score: {
        color: '#02C39A',
        fontWeight: '900',
        fontSize: 24
    },
    title: {
        fontSize: 18,
        color: '#494D4F'
    }
})
