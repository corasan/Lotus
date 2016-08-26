import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, Animated } from 'react-native';

export default class EditElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            height: new Animated.Value(0),
            visible: false,
            edit: 'Edit'
        }
    }

    showContent = () => {
        this.setState({visible: !this.state.visible});
        if(this.state.visible) {
            this.setState({edit: 'Edit'});
            Animated.spring(this.state.height, {toValue: 0}).start();
        } else {
            this.setState({visible: !this.state.visible, edit: 'Close'});
            Animated.spring(this.state.height, {toValue: 135}).start();
        }
    }

    render() {
        return (
            <View>
                <View style={styles.edit}>
                    <Text style={styles.label}>{this.props.label}</Text>
                    <Text style={styles.valueName}>{this.props.valueName}</Text>

                    <View style={{position: 'absolute', right: 16}}>
                        <TouchableHighlight onPress={this.showContent} underlayColor="transparent">
                            <Text style={styles.editText}>{this.state.edit}</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <Animated.View style={{height: this.state.height, backgroundColor: 'white'}}>
                    {this.props.component}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    edit: {
        flexDirection: 'row',
        height: 60,
        paddingTop: 15,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#E5E5E5'
    },
    valueName: {
        fontSize: 16,
    },
    editText: {
        fontSize: 18,
        color: '#02C39A',
        fontWeight: 'bold'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10
    }
});
