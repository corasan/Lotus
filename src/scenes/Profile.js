import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }
    render() {
        console.log(this.props.userId);
        return (
            <View style={{backgroundColor: 'white'}}>
                
            </View>
        );
    }
}