import React, { Component, PropTypes } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SideMenuButton from './sideMenuBtn';

export default class Menu extends Component {
    logout = () => {
        this.props.closeDrawer();
        AsyncStorage.removeItem('User', () => {
            Actions.login();
        });
    }

    goToProfile = () => {
        this.props.closeDrawer();
        AsyncStorage.getItem('User', (err, userId) => {
            Actions.profile({userId: userId});
        });
    }

    render() {
        return (
            <View>
                <View>
                    <SideMenuButton
                        source={require('../../img/profile.png')}
                        onPress={this.goToProfile}
                        menuText="Profile"
                    />

                    <SideMenuButton
                        source={require('../../img/notifications.png')}
                        onPress={ () => console.log('pressed') }
                        menuText="Notifications"
                    />

                    <SideMenuButton
                        source={require('../../img/clock.png')}
                        onPress={ () => console.log('pressed') }
                        menuText="History"
                    />

                    <SideMenuButton
                        source={require('../../img/about.png')}
                        onPress={ () => console.log('pressed') }
                        menuText="About"
                    />
                </View>

                <View style={{bottom: -70}}>
                    <SideMenuButton
                        source={require('../../img/settings.png')}
                        onPress={ () => console.log('pressed') }
                        menuText="Settings"
                    />

                    <SideMenuButton
                        source={require('../../img/logout.png')}
                        onPress={this.logout}
                        menuText="Log out"
                    />
                </View>
            </View>
        );
    }
}
