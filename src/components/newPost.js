import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, TextInput } from 'react-native';
import firebase from '../../firebaseInit';
import { Actions } from 'react-native-router-flux';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: props.hide,
            text: ''
        }
    }

    hideModal = () => {
        this.setState({hide: true});
        Actions.pop();
    }

    sendPost = () => {
        firebase.database().ref('posts').push({
            author: 'henry',
            title: 'Text',
            text: this.state.text
        });
        this.hideModal();
    }

    handleText = (text) => {
        this.setState({text});
    }

    render() {
        if (this.state.hide === true) {
            return <View></View>
        } else {
            return(
                <View style={styles.modal}>
                    <View style={styles.input}>
                        <TextInput onChangeText={this.handleText}
                            value={this.state.text}
                            autofocus={true}
                            multiline={true}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <TouchableHighlight onPress={this.hideModal}>
                        <Text>Close</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.sendPost}>
                        <Text>Post</Text>
                    </TouchableHighlight>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
    },
    input: {
        width: 300,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
    }
})
