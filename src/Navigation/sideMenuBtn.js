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
            <View>
                <TouchableHighlight
                    onPress={this.props.onPress}
                    underlayColor={this.props.underlayColor}
                    style={styles.menuBtn}
                    underlayColor="#2c3e50"
                >
                    <View style={{flexDirection: 'row'}}>
                        <Image source={this.props.source} style={{height: 42, width: 42}}/>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.menuText}>{this.props.menuText}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 16
    },
    menuBtn: {
        paddingLeft: 16,
        paddingBottom: 10,
        paddingTop: 10
    }
});
