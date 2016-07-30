/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import { Scene, Router, Modal, Actions } from 'react-native-router-flux';
import Posts from './src/scenes/Posts';
import firebase from './firebaseInit';
import NewPost from './src/components/newPost';

class Lotus extends Component {
    newPost = () => {
        Actions.newPost({hide: false});
    }

    render() {
        return (
            <Router>
                <Scene key="modal" component={Modal}>
                    <Scene key="root">
                        <Scene key="posts" component={Posts} title="Posts" rightTitle="New Post"
                        onRight={this.newPost}/>
                    </Scene>
                    <Scene key="newPost" component={NewPost}/>
                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEBE9',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Lotus', () => Lotus);
