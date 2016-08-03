import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Modal,
  TouchableHighlight,
  BackAndroid
} from 'react-native';
import Posts from './src/scenes/Posts';
import firebase from './firebaseInit';
import NewPost from './src/scenes/NewPost';
import navbar from './src/components/navbar';
import ShowPost from './src/scenes/ShowPost';
let navigator;

class Lotus extends Component {
    renderScene = (route, navigator) => {
        switch (route.name) {
            case 'Posts':
                return <Posts navigator={navigator} {...route.passProps}/>
            case 'New Post':
                return <NewPost navigator={navigator} {...route.passProps}/>
            case 'Show Post':
                return <ShowPost postId={route.postId}/>
        }
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true;
            }
            return false;
        });
    }

    render() {
        return (
            <Navigator ref={(nav) => { navigator = nav; }}
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
