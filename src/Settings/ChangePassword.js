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
    saveUsername: {
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
