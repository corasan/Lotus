import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Dimensions, Alert } from 'react-native';

export default class WriteComment extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

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
        let commentsRef = `Comments/${this.state.postId}`;
        let commentId = firebase.database().ref(commentsRef).push().key;

        if (!this.state.commentText) {
            Alert.alert('Error', 'You must type something to post a comment.');
        } else {
            firebase.database().ref(`${commentsRef}/${commentId}`).update({
                comment: this.state.commentText,
                id: this.state.postId,
                commentId: commentId
            });
            this.setState({commentText: ''});
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <TextInput value={this.state.commentText}
                    onChangeText={this.handleComment}
                    autoCapitalize="sentences"
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
