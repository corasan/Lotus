import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, TextInput } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmail = (email) => {
        this.setState({email});
    }

    handlePassword = (password) => {
        this.setState({password});
    }

    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigator.resetTo({name: 'Posts'}) )
        .catch((error) => {
            Alert.alert('Login', error.message);
        });
    }

    render() {
        return (
            <View>
                <Text>Login page</Text>
                <TextInput value={this.state.email} onChangeText={this.handleEmail}/>
                <TextInput value={this.state.password} onChangeText={this.handlePassword}/>

                <TouchableHighlight onPress={this.login} style={styles.loginBtn}>
                    <Text>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    loginBtn: {
        marginTop: 40,
        height: 60,
        width: 160,
        backgroundColor: '#00BFA5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
});
