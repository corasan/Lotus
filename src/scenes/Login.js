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
  Image
} from 'react-native';

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
                    this.setState({animating: !this.state.animating});
                    this.props.navigator.resetTo({name: 'Posts'});
                }, 1000);
            } else {
                this.setState({animating: !this.state.animating});
            }
        });
    }

    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            AsyncStorage.setItem('User', JSON.stringify(user));
            this.props.navigator.resetTo({name: 'Posts'});
        }).catch((error) => {
            Alert.alert('Login', error.message);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems: 'center', }}>
                    <Image
                        source={require('../img/lotus-logo-big.png')}
                        style={{height: 64, width: 110, marginBottom: 20}}
                    />
                    <Text style={{fontSize: 24, fontWeight: '600', color: '#1ABC9C', marginBottom: 20}}>Lotus</Text>
                </View>
                <TextInput
                    value={this.state.email}
                    onChangeText={ (email) => this.setState({email}) }
                    underlineColorAndroid="#1abc9c"
                    placeholder="Email Address"
                    style={{paddingBottom: 6, fontSize: 20}}
                />

                <TextInput
                    value={this.state.password}
                    onChangeText={ (password) => this.setState({password}) }
                    underlineColorAndroid="#1abc9c"
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
                    <TouchableHighlight onPress={ () => {this.props.navigator.push({name: 'Sign up'})} } underlayColor="#16a085">
                        <Text style={{fontSize: 20, fontWeight: '900', color: '#1ABC9C'}}>Sign up!</Text>
                    </TouchableHighlight>
                </View>

                {/*<ActivityIndicator size="large" color="#00BFA5"
                    animating={this.state.animating} style={{top: -210, elevation: 4}} />*/}
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
        height: 55,
        width: 220,
        backgroundColor: '#00BFA5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    inputDiv: {
        backgroundColor: '#bdc3c7',
        marginBottom: 30,
        borderRadius: 4,
        // elevation: 2,
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
        top: 30,
        marginTop: 30
    }
});
