import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import firebase from '../../firebaseInit';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    componentWillMount() {
        firebase.database().ref('Posts').on('value', (data) => {
            this.setState({posts: data.val()});
        }.bind(this));
    }

    render() {
        return (
            <View>

            </View>
        )
    }
}
