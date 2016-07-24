import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from '../../firebaseInit';
import PostsList from '../components/postsList';
import Toolbar from '../components/toolbar';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentWillMount() {
        firebase.database().ref('posts').orderByKey().on('value', function(data) {
            this.setState({posts: data.val()});
        }.bind(this));
    }

    render() {
        return (
            <View style={{marginTop: 55, flex: 1}}>
                <ScrollView>
                    <PostsList posts={this.state.posts} />
                </ScrollView>
            </View>
        )
    }
}
