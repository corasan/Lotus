import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';

export default class ChangeName extends Component {
    handleNewFirstName = (firstN) => {
        this.setState({firstN});
    }

    handleNewLastName = (lastN) => {
        this.setState({lastN});
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.changeName}
                    underlineColorAndroid="#02C39A"
                    style={styles.input}
                    onChangeText={this.handleNewFirstName}
                    placeholder="New First Name"
                />
                <TextInput
                    style={styles.changeName}
                    underlineColorAndroid="#02C39A"
                    style={styles.input}
                    onChangeText={this.handleNewLastName}
                    placeholder="New Last Name"
                />

                <View style={{justifyContent: 'center'}}>
                    <TouchableHighlight style={styles.saveName}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    input: {
        paddingBottom: 6,
        fontSize: 16,
    },
    saveName: {
        height: 45,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    saveText: {
        color: '#02C39A',
        fontWeight: 'bold',
        fontSize: 18
    }
})
