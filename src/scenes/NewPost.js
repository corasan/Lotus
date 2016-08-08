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
                <TextInput
                    value={this.state.title}
                    placeholder="Title"
                    onChangeText={this.handleTitle}
                    autoCapitalize="sentences"
                    style={[styles.input, {marginBottom: 30}]}
                    underlineColorAndroid="#1abc9c"
                />

                <TextInput
                    value={this.state.text}
                    placeholder="Write something here..."
                    onChangeText={this.handleText}
                    autoCapitalize="sentences"
                    multiline={true}
                    maxLength={600}
                    numberOfLines={5}
                    underlineColorAndroid="#1abc9c"
                    onChange={(event) => {
                        this.setState({
                            text: event.nativeEvent.text,
                            height: event.nativeEvent.contentSize.height,
                        });
                    }}
                    style={[styles.input, {height: Math.max(58, this.state.height > 200 ? 200 : this.state.height)}]}
                />

                <View style={{marginTop: 40, alignItems: 'center'}}>
                    <TouchableHighlight
                        onPress={this.sendPost}
                        placeholder="Title" style={styles.sendBtn}
                        underlayColor="#16a085"
                    >
                        <Text style={{color: 'white', fontWeight: '900', fontSize: 16}}>Send Post</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    sendBtn: {
        backgroundColor: '#1ABC9C',
        width: 200,
        alignItems: 'center',
        marginTop: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30
    },
    input: {
        paddingBottom: 6,
        fontSize: 18,
    },
});
