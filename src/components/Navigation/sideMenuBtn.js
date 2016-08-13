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
                <View style={{flexDirection: 'row'}}>
                    <Image source={this.props.source}/>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 16}}>{this.props.menuText}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({

});
