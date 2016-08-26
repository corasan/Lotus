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

export default class ChangeUsername extends Component {
    static propTypes = {
        username: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            newUsername: '',
        }
    }

    saveUsername = () => {
        let currentUsername = this.props.username;
        let newUsername = this.state.newUsername;
        let uid = this.props.uid;
        if (newUsername === '') {
            Alert.alert('Can\'t be empty', 'Please if enter a new username if you want to change it.')
        } else {
            firebase.database().ref(`Users/${uid}`).update({username: newUsername});
            firebase.database().ref(`Usernames/${newUsername}`).set({uid: uid});
            firebase.database().ref(`Usernames/${currentUsername}`).remove();
            this.setState({newUsername: ''});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.newUsername}
                    onChangeText={ (newUsername) => this.setState({newUsername}) }
                    style={styles.input}
                    underlineColorAndroid='#02C39A'
                    placeholder="New Username"
                />

                <View style={styles.button}>
                    <TouchableHighlight style={styles.saveUsername} onPress={this.saveUsername}>
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
