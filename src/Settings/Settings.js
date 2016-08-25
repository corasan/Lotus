import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TextInput, AsyncStorage, Animated, TouchableHighlight } from 'react-native';
import ChangeName from './ChangeName';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            show: new Animated.Value(0),
            visible: false
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('User', (err, result) => {
            let uid = result.replace(/["]+/g, '');
            firebase.database().ref(`Users/${uid}`).on('value', function(snapshot) {
                let user = snapshot.val();
                this.setState({name: user.displayName, uid: uid});
            }.bind(this));
        });
    }

    showContent = () => {
        this.setState({visible: !this.state.visible});
        if(this.state.visible) {
            Animated.spring(this.state.show, {toValue: 0}).start();
        } else {
            this.setState({visible: !this.state.visible});
            Animated.spring(this.state.show, {toValue: 1}).start();
        }
    }

    hideContent = () => {
        Animated.spring(this.state.show, {toValue: 0}).start();
        this.setState({visible: !this.state.visible});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
                    <Text style={styles.name}>{this.state.name}</Text>
                    <TouchableHighlight onPress={this.showContent} underlayColor="transparent" style={{marginTop: 3}}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableHighlight>
                </View>
                <Animated.View style={{opacity: this.state.show, backgroundColor: 'white'}}>
                    <ChangeName hide={this.hideContent}/>
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
        color: '#02C39A'
    }
});
