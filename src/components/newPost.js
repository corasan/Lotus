import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';
import firebase from '../../firebaseInit';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: props.hide
        }
    }

    hideModal = () => {
        this.setState({hide: true});
    }

    render() {
        if (this.state.hide === true) {
            return <View></View>
        } else {
            return(
                <View style={styles.modal}>
                    <Text>Hello World!</Text>
                    <TouchableHighlight onPress={this.hideModal}>
                        <Text>Close</Text>
                    </TouchableHighlight>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black'
    }
})
