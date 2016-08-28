import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TextInput, AsyncStorage, Animated, TouchableHighlight, Alert } from 'react-native';
import ChangeName from './ChangeName';
import ChangeEmail from './ChangeEmail';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import EditElement from './EditElement';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            visible: false
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('User', (err, user) => {
            user = JSON.parse(user);
            firebase.database().ref(`Users/${user.uid}`).on('value', function(snapshot) {
                let data = snapshot.val();
                this.setState({
                    name: data.displayName,
                    uid: user.uid,
                    email: data.email,
                    username: data.username
                });
            }.bind(this));
        });
    }

    hideContent = () => {
        Animated.spring(this.state.nameEditHeight, {toValue: 0}).start();
        this.setState({visible: !this.state.visible});
    }

    deleteAccount = () => {
        let user = firebase.auth().currentUser;
        user.delete().then( () => {
            firebase.database().ref(`Users/${user.uid}`).remove();
            firebase.database().ref(`Usernames/${this.state.username}`).remove();
        });
    }

    deleteAccountConfirmation = () => {
        Alert.alert(
            'Delete Account',
            `${this.state.name}, are you sure you want to delete your account?
            All your data will be delete. Like, are you really really sure??`,
            [
                {text: 'Cancel', onPress: () => console.log('Pressed cancel')},
                {text: 'Yes, delete account', onPress: () => this.deleteAccount}
            ]
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <EditElement
                    label="Name"
                    valueName={this.state.name}
                    component={<ChangeName uid={this.state.uid}/>}
                />

                <EditElement
                    label="Username"
                    valueName={this.state.username}
                    component={<ChangeUsername uid={this.state.uid} username={this.state.username}/>}
                />

                <EditElement
                    label="Email"
                    valueName={this.state.email}
                    component={<ChangeEmail uid={this.state.uid}/>}
                />

                <View style={{marginTop: 30}}>
                    <Text style={{marginLeft: 16, fontSize: 16}}>Security & Privacy</Text>
                    <EditElement
                        label="Password"
                        valueName="********"
                        component={<ChangePassword/>}
                        heightIncrease={180}
                    />

                    <View style={{marginTop: 40}}>
                        <TouchableHighlight style={styles.deleteAccountBtn} onPress={this.deleteAccountConfirmation}>
                            <Text style={styles.deleteAccountText}>Delete Account</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60
    },
    edit: {
        flexDirection: 'row',
        marginBottom: 30
    },
    name: {
        fontSize: 18,
    },
    saveName: {
        height: 45,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#02C39A'
    },
    saveText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    editText: {
        fontSize: 18,
        color: '#02C39A',
        fontWeight: 'bold'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    deleteAccountBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#e74c3c',
    },
    deleteAccountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});
