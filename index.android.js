import React, { Component } from 'react';
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
  ToastAndroid,
  StatusBar,
  DrawerLayoutAndroid
} from 'react-native';
import Posts from './src/scenes/Posts';
import firebase from './firebaseInit';
import NewPost from './src/scenes/NewPost';
import ShowPost from './src/scenes/ShowPost';
import Login from './src/scenes/Login';
import Signup from './src/scenes/Signup';
import { Actions, Router, Scene, ActionConst } from 'react-native-router-flux';
import Menu from './src/components/Navigation/sideMenu';
import Drawer from 'react-native-drawer';

let navigator;
class Lotus extends Component {
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());
    }

    render() {
        return (
            <Drawer
                type="static"
                content={<Text>Hello</Text>}
                openDrawerOffset={100}
                tweenHandler={Drawer.tweenPresets.parallax}
            >
                <Router
                    sceneStyle={styles.container}
                    navigationBarStyle={styles.navbar}
                    backButtonImage={require('./src/img/left.png')}
                    drawerImage={require('./src/img/side-menu.png')}
                >
                    <Scene key="root">
                        <Scene key="login" component={Login} initial={true} hideNavBar={true} type={ActionConst.REPLACE}/>
                        <Scene key="signup" component={Signup}/>
                        <Scene key="posts" component={Posts} hideNavBar={false} type={ActionConst.REPLACE}/>
                        <Scene key="newPost" component={NewPost}/>
                        <Scene key="showPost" component={ShowPost} passProps={true}/>
                    </Scene>
                </Router>
            </Drawer>
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
        backgroundColor: '#02C39A',
        elevation: 3,
        borderBottomWidth: 0,
    },
    drawer: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3
    },
});

AppRegistry.registerComponent('Lotus', () => Lotus);
