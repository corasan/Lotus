import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import firebase from '../../firebaseInit';
// import DismissKeyboard from 'dimissKeyboard';
const dismissKeyboard = require('dismissKeyboard');
const width = Dimensions.get('window').width;

export default class WriteComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
            commentText: '',
            height: 0
        }
    }

    handleComment = (commentText) => {
        this.setState({commentText});
    }

    sendComment = () => {
        let commentsRef = 'posts/'+this.state.postId+'/comments';
        let commentId = firebase.database().ref(commentsRef).push().key;
        firebase.database().ref(commentsRef).update({
            comment: this.state.commentText
        });
        this.setState({commentText: ''});
        dismissKeyboard;
    }

    render() {
        return (
            <View style={styles.content}>
                <TextInput value={this.state.commentText}
                    onChangeText={this.handleComment}
                    capitalize="sentence"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    placeholder="Write something..."
                    onChange={(event) => {
                        this.setState({
                            text: event.nativeEvent.commentText,
                            height: event.nativeEvent.contentSize.height,
                        });
                    }}
                    style={{height: Math.max(45, this.state.height), fontSize: 18, width: 300}}
                />

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
        width: width,
        flexDirection: 'row'
    },
    sendBtn: {
        height: 45,
        alignItems: 'center',
        width: 50,
        paddingTop: 8
    }
});
