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
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import Posts from './src/scenes/Posts';
import firebase from './firebaseInit';
import NewPost from './src/scenes/NewPost';
import ShowPost from './src/scenes/ShowPost';
import Login from './src/scenes/Login';
import Signup from './src/scenes/Signup';
import { Actions, Router, Scene, ActionConst } from 'react-native-router-flux';

let navigator;

class Lotus extends Component {
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());
    }

    render() {
        return (
            <Router sceneStyle={styles.container} navigationBarStyle={styles.navbar}
                backButtonImage={require('./src/img/left.png')}
            >
                <Scene key="root">
                    <Scene key="login" component={Login} initial={true} hideNavBar={true} type={ActionConst.REPLACE}/>
                    <Scene key="posts" component={Posts} hideNavBar={false} type={ActionConst.REPLACE} title="Posts"/>
                    <Scene key="newPost" component={NewPost}/>
                    <Scene key="showPost" component={ShowPost} passProps={true}/>
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
    navbar: {
        backgroundColor: '#00BFA5',
        elevation: 3,
        borderBottomWidth: 0,
    }
});

AppRegistry.registerComponent('Lotus', () => Lotus);
