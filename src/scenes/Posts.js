import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from '../../firebaseInit';
import PostsList from '../components/postsList';
// import Toolbar from '../components/toolbar';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            nav: this.props.navigator
        }
    }

    componentWillMount() {
        firebase.database().ref('posts').on('value', function(data) {
            let posts = data.val();
            let sortedPosts = Object.keys(posts).reverse().map((date) => posts[date])
            this.setState({posts: sortedPosts});
        }.bind(this));
    }

    test = (postId) => {
        if (postId) {
            this.props.navigator.push({name: 'Show Post', id: postId})
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <PostsList
                        posts={this.state.posts}
                        navigator={ this.state.nav}
                    />
                </ScrollView>
            </View>
        )
    }
}
