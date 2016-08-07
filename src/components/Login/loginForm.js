import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

export default class LoginForm extends Component {
    render() {
        return (
            <View>
                <View style={{backgroundColor: 'white'}}>
                    <TextInput

                    />
                </View>

                <View style={{backgroundColor: 'white'}}>
                    <TextInput/>
                </View>
            </View>
        );
    }
}
