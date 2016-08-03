import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import TimeAgo from 'react-native-timeago';

export default class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            createdAt: ''
        }
    }

    componentWillMount() {
        firebase.database().ref('posts/'+this.props.id).once('value')
        .then((data) => {
            let post = data.val();
            this.setState({title: post.title, content: post.text, createdAt: post.createdAt});
        });
    }

    render() {
        return (
            <View>
                <Text>{this.state.title}</Text>
                <Text>{this.state.content}</Text>
                <TimeAgo time={this.state.createdAt}/>
            </View>
        );
    }
}
