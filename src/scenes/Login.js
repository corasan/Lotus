import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, TextInput, AsyncStorage, ActivityIndicator } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            animating: true
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('User', (err, result) => {
            if(result) {
                this.setState({animating: true});
                setTimeout(() => {
                    // this.setState({animating: !this.state.animating});
                    // this.props.navigator.resetTo({name: 'Posts'});
                }, 1000);
            } else {
                this.setState({animating: !this.state.animating});
            }
        });
    }

    handleEmail = (email) => {
        this.setState({email});
    }

    handlePassword = (password) => {
        this.setState({password});
    }

    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            AsyncStorage.setItem('User', JSON.stringify(user));
            this.props.navigator.resetTo({name: 'Posts'});
        })
        .catch((error) => {
            Alert.alert('Login', error.message);
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={[styles.inputDiv]}>
                    <TextInput value={this.state.email} onChangeText={this.handleEmail} style={styles.input} underlineColorAndroid='transparent'/>
                </View>
                <View style={[styles.inputDiv]}>
                    <TextInput value={this.state.password} onChangeText={this.handlePassword} style={styles.input} underlineColorAndroid='transparent'/>
                </View>

                <View style={{alignItems: 'center'}}>
                    <TouchableHighlight onPress={this.login} style={styles.loginBtn}>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '900'}}>Login</Text>
                    </TouchableHighlight>
                </View>
                <ActivityIndicator size="large" color="#00BFA5" animating={this.state.animating} style={{top: -210, elevation: 4}} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    loginBtn: {
        marginTop: 40,
        height: 60,
        width: 160,
        backgroundColor: '#00BFA5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    inputDiv: {
        backgroundColor: 'white',
        marginBottom: 30,
        borderRadius: 4,
        elevation: 2,
        padding: -2
    },
    input: {
        paddingBottom: 6,
        paddingLeft: 6,
        fontSize: 20,
        paddingTop: 5
    }
});
