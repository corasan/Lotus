import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import TimeAgo from 'react-native-timeago';

export default class Post extends Component {
    render() {
        return (
            <View style={styles.post}>
                <Text style={styles.postTitle}>{this.props.title}</Text>
                <Text style={styles.postContent}>{this.props.text}</Text>

                <View>
                    <TimeAgo time={this.props.createdAt}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: 'white',
        padding: 15,
        elevation: 3
    },
    postTitle: {
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 15,
    },
    postContent: {
        marginBottom: 30
    },
    time: {
        alignItems: 'flex-end'
    },
});
