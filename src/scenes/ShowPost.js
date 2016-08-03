import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import TimeAgo from 'react-native-timeago';
import WriteComment from '../components/writeComment';

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
            this.setState({title: post.title, content: post.text, createdAt: post.createdAt});
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.post}>
                    <Text style={styles.postTitle}>{this.state.title}</Text>
                    <Text style={styles.postContent}>{this.state.content}</Text>

                    <View>
                        <TimeAgo time={this.state.createdAt}/>
                    </View>
                </View>

                {/*<Text style={styles.commentSection}>Comments</Text>*/}
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
    }
});
