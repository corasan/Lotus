import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

export default class NewPostInput extends Component {
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

    render() {
        return (
            <View>
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
            </View>
        );
    }
}
