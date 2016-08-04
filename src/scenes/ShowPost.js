import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import SendComment from '../components/ShowPost/sendComment';
import Post from '../components/ShowPost/post';

export default class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            createdAt: '',
            postId: this.props.postId,
            comments: []
        }
    }

    componentWillMount() {
        firebase.database().ref('Posts/'+this.state.postId).on('value', function(data) {
            let post = data.val();
            console.log(post.title);
            this.setState({title: post.title, text: post.text, createdAt: post.createdAt});
        }.bind(this));
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Post title={this.state.title} text={this.state.text} createdAt={this.state.createdAt}/>

                <SendComment postId={this.state.postId}/>
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
