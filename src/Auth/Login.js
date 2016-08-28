import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  Image,
  StatusBar
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            animating: true
        }
    }

    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            let userObject = {uid: user.uid, email: this.state.email, password: this.state.password};
            AsyncStorage.setItem('User', JSON.stringify(userObject));
            Actions.posts();
        }).catch((error) => {
            Alert.alert('Login error', error.message);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems: 'center', }}>
                    <Image source={require('../img/lotus-logo-big.png')} style={styles.logoImg}/>
                    <Text style={styles.logoTitle}>Lotus</Text>
                </View>
                <TextInput
                    value={this.state.email}
                    onChangeText={ (email) => this.setState({email}) }
                    underlineColorAndroid="#02C39A"
                    placeholder="Email Address"
                    style={styles.input}
                />

                <TextInput
                    value={this.state.password}
                    onChangeText={ (password) => this.setState({password}) }
                    underlineColorAndroid="#02C39A"
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.input}
                />

                <View style={{alignItems: 'center', marginTop: 20}}>
                    <TouchableHighlight onPress={this.login} style={styles.loginBtn} underlayColor="#16a085">
                        <Text style={styles.loginText}>Log in</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.signupBtn}>
                    <TouchableHighlight onPress={ () => Actions.signup() } underlayColor="#16a085">
                        <Text style={styles.signupText}>Sign up!</Text>
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
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white',
    },
    loginBtn: {
        marginTop: 20,
        height: 50,
        width: 250,
        backgroundColor: '#00BFA5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    input: {
        paddingBottom: 6,
        fontSize: 20
    },
    signupBtn: {
        alignItems: 'center',
        marginTop: 50
    },
    signupText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#02C39A'
    },
    loginText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '900'
    },
    logoTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#02C39A',
        marginBottom: 20
    },
    logoImg: {
        height: 64,
        width: 110,
        marginBottom: 20
    }
});
