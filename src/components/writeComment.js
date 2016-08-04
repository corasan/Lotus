import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import firebase from '../../firebaseInit';
import CommentInput from './commentInput';

export default class WriteComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
        }
    }

    sendComment = () => {
        let commentsRef = 'posts/'+this.state.postId+'/comments';
        let commentId = firebase.database().ref(commentsRef).push().key;

        firebase.database().ref(commentsRef).update({
            comment: this.state.commentText
        });
        this.setState({commentText: ''});
    }

    render() {
        return (
            <View style={styles.content}>
                <CommentInput/>

                <View>
                    <TouchableHighlight underlayColor="gray" onPress={this.sendComment} style={styles.sendBtn}>
                        <Text style={{fontSize: 18, fontWeight: '900'}}>Send</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        elevation: 3,
        padding: 6,
        flexDirection: 'row'
    },
    sendBtn: {
        height: 45,
        alignItems: 'center',
        width: 50,
        paddingTop: 8
    }
});
