import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';

export default class ChangeName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstN: '',
            lastN: ''
        }
    }
    // handleNewFirstName = (firstN) => {
    //     this.setState({firstN});
    // }
    //
    // handleNewLastName = (lastN) => {
    //     this.setState({lastN});
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput
                        value={this.state.firstN}
                        onChangeText={ (firstN) => this.setState({firstN}) }
                        style={[styles.input, {width: 160}]}
                        underlineColorAndroid='#02C39A'
                        placeholder="First name"
                        autoCapitalize="sentences"
                    />

                    <TextInput
                        value={this.state.lastN}
                        onChangeText={ (lastN) => this.setState({lastN}) }
                        style={[styles.input, {width: 160}]}
                        underlineColorAndroid='#02C39A'
                        placeholder="Last name"
                        autoCapitalize="sentences"
                    />
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
