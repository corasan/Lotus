import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    Login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigator.resetTo({name: 'Posts'}) )
        .catch((error) => {
            Alert.alert('Login', error.message);
        });
    }

    render() {
        return (
            <Text>Login page</Text>
        );
    }
}
