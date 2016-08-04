import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import WriteComment from '../components/writeComment';
import Post from '../components/post';

export default class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            createdAt: '',
            postId: this.props.postId
        }
    }

    componentWillMount() {
        firebase.database().ref('posts/'+this.state.postId).once('value')
        .then((data) => {
            let post = data.val();
            this.setState({title: post.title, text: post.text, createdAt: post.createdAt});
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Post title={this.state.title} text={this.state.text} createdAt={this.state.createdAt}/>

                <WriteComment postId={this.state.postId}/>
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
    commentSection: {
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: '900'
    },
});
