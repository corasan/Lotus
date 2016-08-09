import React, { Component, StatusBar } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Modal,
  TouchableHighlight,
  BackAndroid,
  AsyncStorage
} from 'react-native';
import Posts from './src/scenes/Posts';
import firebase from './firebaseInit';
import navbar from './src/components/Navigation/navbar';
import NewPost from './src/scenes/NewPost';
import ShowPost from './src/scenes/ShowPost';
import Login from './src/scenes/Login';
import Signup from './src/scenes/Signup';
import { Actions, Router, Scene, ActionConst } from 'react-native-router-flux';

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
            case 'Login':
                return <Login navigator={navigator}/>
            case 'Sign up':
                return <Signup navigator={navigator}/>
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
            <Router>
                <Scene key="root">
                    <Scene key="login" component={Login} initial={true} hideNavBar={true}/>
                    <Scene key="posts" component={Posts} hideNavBar={false} type={ActionConst.REPLACE}/>
                    <Scene key="newPost" component={NewPost} />
                    <Scene key="signup" component={Signup} hideNavBar={true}/>
                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEBE9',
    marginTop: 55,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('Lotus', () => Lotus);
