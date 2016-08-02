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
import NewPost from './src/scenes/NewPost';
import navbar from './src/components/navbar';

class Lotus extends Component {
    renderScene = (route, nav) => {
        switch (route.name) {
            case 'Posts':
                return <Posts/>
            case 'New Post':
                return <NewPost navigator={nav}/>
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: 'Posts', index: 0}}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar routeMapper={navbar} style={{elevation: 4, backgroundColor: 'white'}}/>
                }
                sceneStyle={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEBE9',
    marginTop: 55
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('Lotus', () => Lotus);
