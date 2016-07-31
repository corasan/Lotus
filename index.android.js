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

const navbar = {
    LeftButton(route, navigator, index, navState) {
        if(index > 0) {
            return (
                <TouchableHighlight onPress={ () => {navigator.pop()} }>
                    <Text>Back</Text>
                </TouchableHighlight>
            )
        } else { return null}
    },
    RightButton(route, navigator, index, navState) {
        if(route.name === 'Posts') {
            return (
                <TouchableHighlight onPress={ () => {console.log('Pressed')} }>
                    <Text>New Post</Text>
                </TouchableHighlight>
            )
        }
    },
    Title(route, navigator, index, navState) {
        return <Text>{route.name}</Text>
    }
}

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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Lotus', () => Lotus);
