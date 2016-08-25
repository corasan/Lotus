import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TextInput, AsyncStorage, Animated, TouchableHighlight } from 'react-native';
import ChangeName from './ChangeName';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            height: new Animated.Value(0)
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('User', (err, uid) => {
            uid = uid.replace(/["]+/g, '');
            firebase.database().ref(`Users/${uid}`).on('value', function(snapshot) {
                let user = snapshot.val();
                this.setState({name: user.displayName});
            }.bind(this));
        });
    }

    showContent = () => {
        Animated.spring(this.state.height, {toValue: 150}).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name}>{this.state.name}</Text>
                    <TouchableHighlight onPress={this.showContent}>
                        <Text>Edit</Text>
                    </TouchableHighlight>
                </View>
                <Animated.View style={{height: this.state.height, backgroundColor: 'white'}}>
                    <ChangeName/>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});
