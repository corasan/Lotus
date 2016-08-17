import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import OptionsMenu from '../components/Navigation/optionsMenu';

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: new Animated.Value(0)
        }
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.open === true) {
            Animated.spring(this.state.height, {toValue: 100}).start();
            return true;
        }
    }

    close = () => {
        Animated.spring(this.state.height, {toValue: 0}).start();
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.show} style={{marginTop: 50}}>
                    <Text>Show</Text>
                </TouchableHighlight>

                <Animated.View style={{backgroundColor: 'white', width: 120, height: this.state.height, elevation: 6}}>
                    <TouchableHighlight onPress={() => Actions.posts({type: ActionConst.RESET})}>
                        <Text>Hello</Text>
                    </TouchableHighlight>
                </Animated.View>

                <TouchableHighlight onPress={this.close} style={{marginTop: 50}}>
                    <Text>Show</Text>
                </TouchableHighlight>

                <OptionsMenu>
                    <Text>Hello</Text>
                </OptionsMenu>
            </View>
        );
    }
}
