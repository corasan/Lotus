import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, TextInput } from 'react-native';
import firebase from '../../firebaseInit';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: ''
        }
    }

    handleText = (text) => {
        this.setState({text});
    }

    handleTitle = (title) => {
        this.setState({title});
    }

    sendPost = () => {
        let d = new Date;
        firebase.database().ref('posts').push({
            title: this.state.title,
            text: this.state.text,
            postedAt: -d.getTime()
        });
        this.setState({title: '', text: ''});
        this.props.navigator.pop();
    }

    render() {
        return (
            <View>
                <TextInput value={this.state.title} onChangeText={this.handleTitle}/>
                <TextInput value={this.state.text} onChangeText={this.handleText}/>
                <TouchableHighlight onPress={this.sendPost}>
                    <Text>Send Post</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
