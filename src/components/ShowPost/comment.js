import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native';


export default class Comment extends Component {
    static get defaultProps() {
        data: {comment: 'No comments!!'}
    }
    render() {
        return (
            <Text>{this.props.data.comment}</Text>
        );
    }
}
