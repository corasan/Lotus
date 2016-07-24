import React, { Component } from 'react';
import { StyleSheet, Text, View, ToolbarAndroid, } from 'react-native';
import firebase from '../../firebaseInit';
import NewPost from './newPost';

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    onActionSelected = (position) => {
        if(position === 0) {
            // firebase.database().ref('posts').push({
            //     author: 'henry',
            //     title: 'Text',
            //     text: 'Testing the creation of a new post'
            // });
        }
    }
    render() {
        return(
            <View>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="Lotus"
                    actions={[{title: 'New Post', icon: require('../img/Plus-48.png'), show: 'always'}]}
                    onActionSelected={this.onActionSelected}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 70,
        backgroundColor: 'white',
        elevation: 4
    }
})
