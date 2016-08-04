import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import firebase from '../../firebaseInit';

export default class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            height: 0
        }
    }

    handleComment = (commentText) => {
        this.setState({commentText});
    }

    render() {
        return (
            <TextInput value={this.state.commentText}
                onChangeText={this.handleComment}
                capitalize="sentence"
                underlineColorAndroid="transparent"
                multiline={true}
                placeholder="Write something..."
                onChange={(event) => {
                    this.setState({
                        commentText: event.nativeEvent.commentText,
                        height: event.nativeEvent.contentSize.height,
                    });
                }}
                style={{height: Math.max(45, this.state.height), fontSize: 18, width: 300}}
            />
        );
    }
}
