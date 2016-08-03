import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';

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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: 360,
        elevation: 3,
        padding: 6
    },
});
