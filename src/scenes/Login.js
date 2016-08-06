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
} from 'react-native'
import TextField from 'react-native-md-textinput';

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
                <View style={styles.inputDiv}>
                    <TextInput value={this.state.email}
                        onChangeText={ (email) => this.setState({email}) }
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="Email"
                    />
                </View>

                <View style={styles.inputDiv}>
                    <TextInput value={this.state.password}
                        onChangeText={(password) => this.setState({password}) }
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                </View>

                <View style={{alignItems: 'center'}}>
                    <TouchableHighlight onPress={this.login} style={styles.loginBtn}>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '900'}}>Login</Text>
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
        top: 20
    },
    loginBtn: {
        marginTop: 20,
        height: 50,
        width: 334,
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
