import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, Animated } from 'react-native';

export default class ChangeEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmail: ''
        }
    }

    saveEmail = () => {
        firebase.database().ref(`Users/${this.props.uid}`).update({
            email: this.state.newEmail
        });
        this.setState({newEmail: ''});
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.newEmail}
                    onChangeText={ (newEmail) => this.setState({newEmail}) }
                    style={styles.input}
                    underlineColorAndroid='#02C39A'
                    placeholder="New Email"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingRight: 16,
        paddingLeft: 16
    },
    input: {
        paddingBottom: 6,
        fontSize: 16,
    },
});
