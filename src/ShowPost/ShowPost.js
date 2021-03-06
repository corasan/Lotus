import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, ScrollView } from 'react-native';
import SendComment from './sendComment';
import Post from './post';
import CommentsList from './commentsList';

export default class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
            comments: [],
        }
    }

    componentWillMount() {
        firebase.database().ref('Posts/'+this.state.postId).on('value', function(data) {
            let post = data.val();
            this.setState({title: post.title, text: post.text, createdAt: post.createdAt, post: post});
            firebase.database().ref('Comments/'+this.state.postId).on('value', function(commentsData) {
                this.setState({comments: commentsData.val()})
            }.bind(this));
        }.bind(this));
    }

    render() {
        if(!this.state.comments) {
            return (
                <View style={{flex: 1}}>
                    <Post title={this.state.title} text={this.state.text} createdAt={this.state.createdAt} postId={this.state.postId}/>
                    <Text style={styles.noComment}>No comments</Text>
                    <SendComment postId={this.state.postId}/>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    <Post title={this.state.title} text={this.state.text} createdAt={this.state.createdAt} postId={this.state.postId}/>
                    <ScrollView style={{marginBottom: 60}}>
                        <CommentsList comments={this.state.comments}/>
                    </ScrollView>
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
    noComment: {
        fontSize: 30, marginLeft: 80, marginTop: 120
    }
});
