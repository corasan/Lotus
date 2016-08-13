import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight, Image, View } from 'react-native';

export default class SideMenuButton extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        btnStyle: PropTypes.object,
        source: PropTypes.number.isRequired,
        menuText: PropTypes.string,
    }

    render() {
        return(
            <View style={{marginBottom: 22}}>
                <TouchableHighlight
                    onPress={this.props.onPress}
                    underlayColor={this.props.underlayColor}
                    style={{paddingLeft: 26}}
                    underlayColor="#2c3e50"
                >
                    <View style={{flexDirection: 'row'}}>
                        <Image source={this.props.source}/>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 16, marginLeft: 8}}>{this.props.menuText}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
