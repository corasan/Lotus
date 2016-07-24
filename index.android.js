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
import {Scene, Router} from 'react-native-router-flux';
import Posts from './src/scenes/Posts';

class Lotus extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="posts" component={Posts} title={Posts} />
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
