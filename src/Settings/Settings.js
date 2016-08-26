import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TextInput, AsyncStorage, Animated, TouchableHighlight } from 'react-native';
import ChangeName from './ChangeName';
import ChangeEmail from './ChangeEmail';
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
        AsyncStorage.getItem('User', (err, result) => {
            let uid = result.replace(/["]+/g, '');
            firebase.database().ref(`Users/${uid}`).on('value', function(snapshot) {
                let user = snapshot.val();
                this.setState({name: user.displayName, uid: uid, email: user.email});
            }.bind(this));
        });
    }

    hideContent = () => {
        Animated.spring(this.state.nameEditHeight, {toValue: 0}).start();
        this.setState({visible: !this.state.visible});
    }

    render() {
        return (
            <View style={styles.container}>
                <EditElement
                    label="Name"
                    valueName={this.state.name}
                    component={<ChangeName/>}
                />

                <EditElement
                    label="Email"
                    valueName={this.state.email}
                    component={<ChangeEmail/>}
                />
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
    }
});
