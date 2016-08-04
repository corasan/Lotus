import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import firebase from '../../firebaseInit';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import NewPostInput from '../components/NewPost/newPostInput';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            height: 0,
        }
    }

    sendPost = () => {
        if (this.state.title === '' || this.state.text === '') {
            Alert.alert('Can\'t post', 'Title or Text content cannot be empty.');
        } else {
            let date = new Date();
            let postId = firebase.database().ref('posts').push().key;
            firebase.database().ref('posts/'+postId).update({
                title: this.state.title,
                text: this.state.text,
                id: postId,
                createdAt: date
            });
            this.setState({title: '', text: ''});
            this.props.navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <NewPostInput/>

                <TouchableHighlight onPress={this.sendPost} placeholder="Title" style={styles.sendBtn} underlayColor="#27ae60">
                    <Text style={{color: 'white', fontWeight: '900', fontSize: 16}}>Send Post</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
    postTitle: {

    },
    sendBtn: {
        backgroundColor: '#2ecc71',
        width: 130,
        alignItems: 'center',
        marginLeft: 95,
        marginTop: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 4
    },
    input: {
        paddingBottom: 5,
        paddingLeft: 5,
        fontSize: 16,
    },
    inputTitle: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        paddingTop: -10,
        borderRadius: 2,
        backgroundColor: 'white'
    },
    inputText: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 2,
        marginTop: 40,
        backgroundColor: 'white',
    }
});
