import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight, Image, View } from 'react-native';

export default class SideMenuButton extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        btnStyle: PropTypes.object,
        source: PropTypes.number.isRequired,
        menuText: PropTypes.string,
        underlayColor: PropTypes.string
    }

    render() {
        return(
            <TouchableHighlight onPress={this.props.onPress} underlayColor={this.props.underlayColor}>
                <View>
                    <Image source={this.props.source}/>
                    <Text>{this.props.menuText}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    
});
