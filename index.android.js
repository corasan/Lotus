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
import Posts from './src/Posts/Posts';
import firebase from './firebaseInit';
import NewPost from './src/Posts/NewPost';
import ShowPost from './src/ShowPost/ShowPost';
import Login from './src/Auth/Login';
import Signup from './src/Auth/Signup';
import Profile from './src/Profile/Profile';
import Settings from './src/Settings/Settings';
import Start from './src/Auth/Start';
import { Actions, Router, Scene, ActionConst } from 'react-native-router-flux';
import Menu from './src/Navigation/menu';
import Drawer from 'react-native-drawer';

let navigator;
class Lotus extends Component {
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());
    }

    render() {
        return (
            <Drawer
                type="overlay"
                tapToClose={true}
                content={<Menu closeDrawer={ () => this.drawer.close() }/>}
                //openDrawerOffset={100}
                //tweenHandler={Drawer.tweenPresets.parallax}
                tapToClose={true}
                ref={ (ref) => this.drawer = ref}
                // Overlay drawer settings
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                elevation={3}
            >
                <Router
                    sceneStyle={styles.container}
                    navigationBarStyle={styles.navbar}
                    backButtonImage={require('./src/img/left.png')}
                    drawerImage={require('./src/img/side-menu.png')}
                >
                    <Scene key="root">
                        <Scene key="start" component={Start} initial={true} hideNavBar={true}/>
                        <Scene key="login" component={Login} type={ActionConst.REPLACE}/>
                        <Scene key="signup" component={Signup}/>
                        <Scene key="posts" component={Posts} hideNavBar={false} type={ActionConst.REPLACE}/>
                        <Scene key="newPost" component={NewPost}/>
                        <Scene key="showPost" component={ShowPost} passProps={true}/>
                        <Scene key="profile" component={Profile} passProps={true}/>
                        <Scene key="settings" component={Settings}/>
                    </Scene>
                </Router>
            </Drawer>
        );
    }
}

const styles = {
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
    }
};

AppRegistry.registerComponent('Lotus', () => Lotus);
