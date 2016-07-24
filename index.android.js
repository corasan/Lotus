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
import Posts from './src/scenes/Posts';

class Lotus extends Component {
    renderScene = (route, navigator) => {
        switch (route.name) {
            case 'Posts':
                return <Posts />
        }
    }
    render() {
        return (
            <Navigator
                initialRoute={{name: 'Posts', index: 0}}
                renderScene={this.renderScene}
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
