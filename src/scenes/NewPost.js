import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            height: 0,
        }
    }

    handleText = (text) => {
        this.setState({text});
    }

    handleTitle = (title) => {
        this.setState({title});
    }

    sendPost = () => {
        if (this.state.title === '' || this.state.text === '') {
            Alert.alert('Can\'t post', 'Title or Text content cannot be empty.');
        } else {
            let date = new Date();
            let postId = firebase.database().ref('Posts').push().key;
            firebase.database().ref('Posts/'+postId).update({
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
                <View style={styles.inputTitle}>
                    <TextInput value={this.state.title} placeholder="Title"
                        onChangeText={this.handleTitle} style={styles.input}
                        underlineColorAndroid="transparent" autoCapitalize="sentences"
                    />
                </View>

                <View style={styles.inputText}>
                    <TextInput value={this.state.text} placeholder="Write something here..."
                        onChangeText={this.handleText} autoCapitalize="sentences"
                        multiline={true}
                        onChange={(event) => {
                            this.setState({
                                text: event.nativeEvent.text,
                                height: event.nativeEvent.contentSize.height,
                            });
                        }}
                        style={[styles.input, {height: Math.max(45, this.state.height)}]}
                    />
                </View>

                <TouchableHighlight onPress={this.sendPost} placeholder="Title" style={styles.sendBtn} underlayColor="#16a085">
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
    sendBtn: {
        backgroundColor: '#1ABC9C',
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
        paddingTop: -6,
        borderRadius: 2,
        backgroundColor: 'white',
        elevation: 2,
        paddingBottom: -2
    },
    inputText: {
        borderRadius: 2,
        marginTop: 40,
        backgroundColor: 'white',
        elevation: 2
    }
});
