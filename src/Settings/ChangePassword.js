import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    ToastAndroid,
    AsyncStorage,
    Alert
} from 'react-native';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {newPassword: '', confirmPassword: ''}
    }

    confirmPasswordChange = () => {
        let confirmPassword = this.state.confirmPassword;
        let newPassword = this.state.confirmPassword;

        if (confirmPassword !== newPassword) {
            Alert.alert('Change Password', 'Password doesn\'t match.');
        } else if (newPassword === '') {
            Alert.alert('Change Password', 'You must type a new password.');
        } else if (confirmPassword === '') {
            Alert.alert('Change Password', 'You must type a password confirmation.');
        } else {
            Alert.alert(
                'Change Password',
                'Are you sure you want to change your password?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel')},
                    {text: 'Ok', onPress: () => console.log('Ok')}
                ]
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.newPassword}
                    onChangeText={ (newPassword) => this.setState({newPassword}) }
                    style={styles.input}
                    underlineColorAndroid='#02C39A'
                    placeholder="New Password"
                />

                <TextInput
                    value={this.state.confirmPassword}
                    onChangeText={ (confirmPassword) => this.setState({confirmPassword}) }
                    style={styles.input}
                    underlineColorAndroid='#02C39A'
                    placeholder="Confirm Password"
                />

                <View style={styles.button}>
                    <TouchableHighlight style={styles.savePassword} onPress={this.confirmPasswordChange}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingRight: 16,
        paddingLeft: 16
    },
    input: {
        paddingBottom: 6,
        fontSize: 16,
    },
    savePassword: {
        height: 40,
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
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginBottom: 5
    }
});
