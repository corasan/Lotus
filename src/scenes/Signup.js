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

    signup = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            firebase.database().ref(`Users/${user.uid}`).set({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                uid: user.uid
            });
        })
        .catch((error) => {
            Alert.alert('Signup Error', error.message);
        })
        .then(() => {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                AsyncStorage.setItem('User', JSON.stringify(user));
                this.props.navigator.resetTo({name: 'Posts'});
            }).catch((error) => {
                Alert.alert('Login Error', error.message);
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput
                        value={this.state.firstName}
                        onChangeText={ (firstName) => this.setState({firstName}) }
                        style={[styles.input, {width: 160}]}
                        underlineColorAndroid='#1abc9c'
                         placeholder="First name"
                         autoCapitalize="sentences"
                    />

                    <TextInput
                        value={this.state.lastName}
                        onChangeText={ (lastName) => this.setState({lastName}) }
                        style={[styles.input, {width: 160}]}
                        underlineColorAndroid='#1abc9c'
                        placeholder="Last name"
                        autoCapitalize="sentences"
                    />
                </View>

                <TextInput value={this.state.email}
                    onChangeText={ (email) => this.setState({email}) }
                    style={styles.input}
                    underlineColorAndroid='#1abc9c'
                    placeholder="Email"
                />

                <TextInput value={this.state.password}
                    onChangeText={ (password) => this.setState({password}) }
                    style={styles.input}
                    underlineColorAndroid='#1abc9c'
                    placeholder="Password"
                    secureTextEntry={true}
                />

                <View style={{alignItems: 'center'}}>
                    <TouchableHighlight style={styles.signupBtn} onPress={this.signup}>
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
        backgroundColor: 'white'
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
        fontSize: 20,
    },
    signupBtn: {
        marginTop: 40,
        height: 55,
        width: 220,
        backgroundColor: '#00BFA5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
});