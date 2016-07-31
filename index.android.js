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
  Navigator,
  Modal,
  TouchableHighlight
} from 'react-native';
// import { Scene, Router, Modal, Actions } from 'react-native-router-flux';
import Posts from './src/scenes/Posts';
import firebase from './firebaseInit';
import NewPost from './src/components/newPost';
import navbar from './src/components/navbar';

class Lotus extends Component {
    renderScene = (route, nav) => {
        switch (route.name) {
            case 'Posts':
                return <Posts/>
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: 'Posts', index: 0}}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar routeMapper={navbar}/>
                }
            />
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
});

AppRegistry.registerComponent('Lotus', () => Lotus);
