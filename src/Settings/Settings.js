import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import ChangeName from './ChangeName';

export default class Settings extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ChangeName/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white'
    }
});
