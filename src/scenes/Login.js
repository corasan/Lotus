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
import { Actions } from 'react-native-router-flux';

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
        StatusBar.setHidden(true);
        AsyncStorage.getItem('User', (err, result) => {
            if(result) {
                this.setState({animating: true});
                setTimeout(() => {
                    this.setState({animating: !this.state.animating});
                    Actions.posts();
                }, 1000);
            } else {
                this.setState({animating: !this.state.animating});
            }
        });
    }

    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            AsyncStorage.setItem('User', JSON.stringify(user.uid));
            Actions.posts();
        }).catch((error) => {
            Alert.alert('Login', error.message);
        });
    }

    goToSignup = () => {
        Actions.signup();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems: 'center', }}>
                    <Image
                        source={require('../img/lotus-logo-big.png')}
                        style={{height: 64, width: 110, marginBottom: 20}}
                    />
                    <Text style={{fontSize: 24, fontWeight: '600', color: '#02C39A', marginBottom: 20}}>Lotus</Text>
                </View>
                <TextInput
                    value={this.state.email}
                    onChangeText={ (email) => this.setState({email}) }
                    underlineColorAndroid="#02C39A"
                    placeholder="Email Address"
                    style={{paddingBottom: 6, fontSize: 20}}
                />

                <TextInput
                    value={this.state.password}
                    onChangeText={ (password) => this.setState({password}) }
                    underlineColorAndroid="#02C39A"
                    placeholder="Password"
                    secureTextEntry={true}
                    style={{paddingBottom: 6, fontSize: 20}}
                />

                <View style={{alignItems: 'center', marginTop: 20}}>
                    <TouchableHighlight onPress={this.login} style={styles.loginBtn} underlayColor="#16a085">
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '900'}}>Log in</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.signupBtn}>
                    <TouchableHighlight onPress={ () => {Actions.signup()} } underlayColor="#16a085">
                        <Text style={{fontSize: 20, fontWeight: '900', color: '#02C39A'}}>Sign up!</Text>
                    </TouchableHighlight>
                </View>

                {/*<ActivityIndicator size="large" color="#00BFA5"
                    animating={this.state.animating} style={{top: -210, elevation: 4}} />*/}
            </View>
        );
    }
}


const styles = {
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
    inputDiv: {
        backgroundColor: '#bdc3c7',
        marginBottom: 30,
        borderRadius: 4,
        padding: -2
    },
    input: {
        backgroundColor: 'white',
        paddingBottom: 6,
        paddingLeft: 6,
        fontSize: 20,
        paddingTop: 5
    },
    signupBtn: {
        alignItems: 'center',
        marginTop: 50
    }
};
