import React, { Component, PropTypes } from 'react';
import { View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    Animated,
    Alert,
    ToastAndroid
} from 'react-native';

export default class ChangeEmail extends Component {
    static propTypes = {
        uid: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            newEmail: ''
        }
    }

    saveEmail = () => {
        let currentUser = firebase.auth().currentUser;
        let newEmail = this.state.newEmail;
        let uid = this.props.uid;
        currentUser.updateEmail(newEmail).then(function() {
            firebase.database().ref(`Users/${uid}`).update({
                email: newEmail
            });
            ToastAndroid.show('Saved', ToastAndroid.SHORT);
        }, function(error) {
            Alert.alert('Error', error)
        });
        this.setState({newEmail: ''});
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.newEmail}
                    onChangeText={ (newEmail) => this.setState({newEmail}) }
                    style={styles.input}
                    underlineColorAndroid='#02C39A'
                    placeholder="New Email"
                />

                <View style={styles.button}>
                    <TouchableHighlight style={styles.saveEmail} onPress={this.saveEmail}>
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
    saveEmail: {
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
