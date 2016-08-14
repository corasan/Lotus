import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, ScrollView } from 'react-native';
import SendComment from '../components/ShowPost/sendComment';
import Post from '../components/ShowPost/post';
import CommentsList from '../components/ShowPost/commentsList';

export default class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            createdAt: '',
            postId: this.props.postId,
            comments: [],
        }
    }

    componentWillMount() {
        firebase.database().ref('Posts/'+this.state.postId).on('value', function(data) {
            let post = data.val();
            this.setState({title: post.title, text: post.text, createdAt: post.createdAt});
            firebase.database().ref('Comments/'+this.state.postId).on('value', function(commentsData) {
                this.setState({comments: commentsData.val()})
            }.bind(this));
        }.bind(this));
    }

    render() {
        if(!this.state.comments) {
            return (
                <View style={{flex: 1}}>
                    <Post title={this.state.title} text={this.state.text} createdAt={this.state.createdAt}/>
                    <Text>No comments</Text>
                    <SendComment postId={this.state.postId}/>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    <Post title={this.state.title} text={this.state.text} createdAt={this.state.createdAt} postId={this.state.postId}/>
                    <CommentsList comments={this.state.comments} noComment={this.state.noComment}/>
                    <SendComment postId={this.state.postId}/>
                </View>
            );
        }
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
