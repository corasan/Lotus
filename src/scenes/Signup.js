import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, TextInput, AsyncStorage, ActivityIndicator } from 'react-native';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    handleFirstName = (firstName) => {
        this.setState({firstName});
    }

    handleLastName = (lastName) => {
        this.setState({lastName});
    }

    handleEmailName = (email) => {
        this.setState({email});
    }

    handlePassword = (password) => {
        this.setState({password});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={[styles.inputDiv, {width: 160}]}>
                        <TextInput value={this.state.firstName} onChangeText={this.handleFirstName} style={styles.input} underlineColorAndroid='transparent' placeholder="First name" secureTextEntry={true}/>
                    </View>

                    <View style={[styles.inputDiv, {width: 160}]}>
                        <TextInput value={this.state.lastName} onChangeText={this.handeLastName} style={styles.input} underlineColorAndroid='transparent' placeholder="Last name" secureTextEntry={true}/>
                    </View>
                </View>

                <View style={[styles.inputDiv, {top: 10}]}>
                    <TextInput value={this.state.email} onChangeText={this.handleEmail} style={styles.input} underlineColorAndroid='transparent' placeholder="Email" secureTextEntry={true}/>
                </View>

                <View style={[styles.inputDiv, {top: 10}]}>
                    <TextInput value={this.state.password} onChangeText={this.handlePassword} style={styles.input} underlineColorAndroid='transparent' placeholder="Password" secureTextEntry={true}/>
                </View>

                <View style={{alignItems: 'center'}}>
                    <TouchableHighlight style={styles.signupBtn}>
                        <Text style={{fontSize: 20, fontWeight: '900', color: 'white'}}>Sign up</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        // top: 20
    },
    inputDiv: {
        backgroundColor: 'white',
        marginBottom: 30,
        borderRadius: 4,
        elevation: 2,
        padding: -2,
        top: 10,
    },
    input: {
        paddingBottom: 6,
        paddingLeft: 6,
        fontSize: 20,
        paddingTop: 5
    },
    signupBtn: {
        marginTop: 40,
        height: 60,
        width: 160,
        backgroundColor: '#00BFA5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
});
