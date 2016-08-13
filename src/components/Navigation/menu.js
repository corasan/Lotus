import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import SideMenuButton from './sideMenuBtn';

export default class Menu extends Component {
    render() {
        return (
            <View>
                <SideMenuButton
                    source={require('../../img/profile.png')}
                    onPress={ () => console.log('pressed') }
                    menuText="Profile"
                />
            </View>
        );
    }
}
