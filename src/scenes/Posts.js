import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableHighlight, Text, AsyncStorage } from 'react-native';
import PostsList from '../components/Posts/postsList';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            nav: this.props.navigator,
        }
    }

    componentWillMount() {
        firebase.database().ref('Posts').on('value', function(data) {
            let posts = data.val();
            let sortedPosts = Object.keys(posts).reverse().map((date) => posts[date])
            this.setState({posts: sortedPosts});
        }.bind(this));

    }



    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableHighlight onPress={
                    () => { AsyncStorage.removeItem('User', () => {
                        this.props.navigator.resetTo({name: 'Login'});
                    })}
                }>
                    <Text>Sign out</Text>
                </TouchableHighlight>
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
