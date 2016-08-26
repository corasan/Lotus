import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, TextInput, AsyncStorage, ActivityIndicator } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

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
        let username = this.state.email.split('@')[0];
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            let repNeeded = Math.pow(40*1, 2);
            let rep = 0;
            firebase.database().ref(`Users/${user.uid}`).set({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                uid: user.uid,
                displayName: `${this.state.firstName} ${this.state.lastName}`,
                rank: 1,
                reputation: rep,
                repNeeded: repNeeded,
                nextRankRep: repNeeded - rep,
                currentRankRep: 0,
                username: username
            });
            this.setState({uid: user.uid})
        })
        .then(() => {
            firebase.database().ref('Usernames/'+username).set({uid: this.state.uid});
        })
        .then(() => {
            let userObject = {uid: this.state.uid, email: this.state.email, password: this.state.password};
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                AsyncStorage.setItem('User', JSON.stringify(userObject));
                Actions.posts({type: ActionConst.RESET});
            }).catch((error) => Alert.alert('Login Error', error.message) );
        }).catch((error) =>  Alert.alert('Signup Error', error.message) );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput
                        value={this.state.firstName}
                        onChangeText={ (firstName) => this.setState({firstName}) }
                        style={[styles.input, {width: 160}]}
                        underlineColorAndroid='#02C39A'
                        placeholder="First name"
                        autoCapitalize="sentences"
                    />

                    <TextInput
                        value={this.state.lastName}
                        onChangeText={ (lastName) => this.setState({lastName}) }
                        style={[styles.input, {width: 160}]}
                        underlineColorAndroid='#02C39A'
                        placeholder="Last name"
                        autoCapitalize="sentences"
                    />
                </View>

                <TextInput value={this.state.email}
                    onChangeText={ (email) => this.setState({email}) }
                    style={styles.input}
                    underlineColorAndroid='#02C39A'
                    placeholder="Email"
                />

                <TextInput value={this.state.password}
                    onChangeText={ (password) => this.setState({password}) }
                    style={styles.input}
                    underlineColorAndroid='#02C39A'
                    placeholder="Password"
                    secureTextEntry={true}
                />

                <View style={{alignItems: 'center'}}>
                    <TouchableHighlight style={styles.signupBtn} onPress={this.signup}>
                        <Text style={styles.signupText}>Sign up</Text>
                    </TouchableHighlight>
                </View>

                <View style={{marginTop: 50, alignItems: 'center'}}>
                    <TouchableHighlight onPress={ () => {Actions.pop()} } underlayColor="#16a085">
                        <Text style={styles.loginText}>Login</Text>
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
        backgroundColor: 'white',
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
        height: 50,
        width: 250,
        backgroundColor: '#00BFA5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    loginText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#02C39A'
    },
    signupText: {
        fontSize: 20,
        fontWeight: '900',
        color: 'white'
    }
});
